import {
  CloudUploadOutlined,
  CopyOutlined,
  DislikeOutlined,
  LikeOutlined,
  OpenAIFilled,
  PaperClipOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  Attachments,
  Bubble,
  Prompts,
  Sender,
  Suggestion,
  useXAgent,
  useXChat,
} from "@ant-design/x";
import type { Conversation } from "@ant-design/x/es/conversations";
import { Button, Space, Spin } from "antd";
import { createStyles } from "antd-style";
import { useEffect, useRef, useState } from "react";

type BubbleDataType = {
  role: string;
  content: string;
};

const MOCK_SESSION_LIST = [
  {
    key: "5",
    label: "New session",
    group: "Today",
  },
  {
    key: "4",
    label: "What has Ant Design X upgraded?",
    group: "Today",
  },
  {
    key: "3",
    label: "New AGI Hybrid Interface",
    group: "Today",
  },
  {
    key: "2",
    label: "How to quickly install and import components?",
    group: "Yesterday",
  },
  {
    key: "1",
    label: "What is Ant Design X?",
    group: "Yesterday",
  },
];
const MOCK_SUGGESTIONS = [
  { label: "Write a report", value: "report" },
  { label: "Draw a picture", value: "draw" },
  {
    label: "Check some knowledge",
    value: "knowledge",
    icon: <OpenAIFilled />,
    children: [
      { label: "About React", value: "react" },
      { label: "About Ant Design", value: "antd" },
    ],
  },
];
const MOCK_QUESTIONS = [
  "Why is TNBC considered more aggressive than other breast cancers?",
  "What are the common approaches of TNBC diagnosis?",
  "Are there reliable in vitro/in vivo models or biomarkers to support discovery and preclinical testing?",
];
const AGENT_PLACEHOLDER = "Generating content, please wait...";

const useCopilotStyle = createStyles(({ token, css }) => {
  return {
    copilotChat: css`
      display: flex;
      flex-direction: column;
      background: ${token.colorBgContainer};
      color: ${token.colorText};
    `,
    // chatHeader 样式
    chatHeader: css`
      height: 52px;
      box-sizing: border-box;
      border-bottom: 1px solid ${token.colorBorder};
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 10px 0 16px;
    `,
    headerTitle: css`
      font-weight: 600;
      font-size: 15px;
    `,
    headerButton: css`
      font-size: 18px;
    `,
    conversations: css`
      width: 300px;
      .ant-conversations-list {
        padding-inline-start: 0;
      }
    `,
    // chatList 样式
    chatList: css`
      overflow: auto;
      padding-block: 16px;
      flex: 1;
    `,
    chatWelcome: css`
      margin-inline: 16px;
      padding: 12px 16px;
      border-radius: 2px 12px 12px 12px;
      background: ${token.colorBgTextHover};
      margin-bottom: 16px;
    `,
    loadingMessage: css`
      background-image: linear-gradient(
        90deg,
        #ff6b23 0%,
        #af3cb8 31%,
        #53b6ff 89%
      );
      background-size: 100% 2px;
      background-repeat: no-repeat;
      background-position: bottom;
    `,
    // chatSend 样式
    chatSend: css`
      padding: 12px;
    `,
    sendAction: css`
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      gap: 8px;
    `,
    speechButton: css`
      font-size: 18px;
      color: ${token.colorText} !important;
    `,
  };
});

interface CopilotProps {
  copilotOpen: boolean;
  setCopilotOpen: (open: boolean) => void;
}
const CustomWelcome = () => (
  <div className="mx-4 mb-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl rounded-bl-md text-gray-800 relative overflow-hidden shadow-lg border border-blue-200/50">
    {/* 背景光效 */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-blue-50/40 to-transparent rounded-2xl rounded-bl-md pointer-events-none"></div>

    {/* 装饰性粒子 */}
    <div className="absolute top-3 right-6 w-2 h-2 bg-blue-400/60 rounded-full animate-pulse"></div>
    <div className="absolute top-8 right-10 w-1 h-1 bg-indigo-400/50 rounded-full animate-pulse delay-300"></div>
    <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-pulse delay-700"></div>

    {/* 头部区域 */}
    {/* <div className="flex items-center gap-4 mb-4 relative z-10">
    
    </div> */}

    {/* 主要内容 */}
    <div className="relative z-10">
      <p className="text-sm leading-relaxed text-gray-700 mb-4">
        👋 Hi, ask me anything about TNBC disease and treatments
      </p>

      {/* 状态指示 */}
      <div className="flex items-center gap-2 text-xs text-gray-600">
        <div className="w-2 h-2 bg-green-500 rounded-full shadow-sm animate-pulse"></div>
        <span className="font-medium">AI Assistant Online • Ready to help</span>
      </div>
    </div>
  </div>
);

const Copilot = (props: CopilotProps) => {
  const { copilotOpen } = props;
  const { styles } = useCopilotStyle();
  const attachmentsRef = useRef<any>(null);
  const abortController = useRef<AbortController>(null);

  // ==================== State ====================

  const [, setMessageHistory] = useState<Record<string, any>>({});

  const [sessionList, setSessionList] =
    useState<Conversation[]>(MOCK_SESSION_LIST);
  const [curSession] = useState(sessionList[0].key);

  const [attachmentsOpen, setAttachmentsOpen] = useState(false);
  const [files, setFiles] = useState<any>([]);

  const [inputValue, setInputValue] = useState("");

  /**
   * 🔔 Please replace the BASE_URL, PATH, MODEL, API_KEY with your own values.
   */

  // ==================== Runtime ====================

  const [agent] = useXAgent<BubbleDataType>({
    baseURL:
      "https://api.x.ant.design/api/llm_siliconflow_deepSeek-r1-distill-1wen-7b",
    model: "DeepSeek-R1-Distill-Qwen-7B",
    dangerouslyApiKey: "Bearer sk-xxxxxxxxxxxxxxxxxxxx",
  });

  const loading = agent.isRequesting();

  const { messages, onRequest } = useXChat({
    agent,
    requestFallback: (_, { error }) => {
      if (error.name === "AbortError") {
        return {
          content: "Request is aborted",
          role: "assistant",
        };
      }
      return {
        content: "Request failed, please try again!",
        role: "assistant",
      };
    },
    transformMessage: (info) => {
      const { originMessage, chunk } = info || {};
      let currentContent = "";
      let currentThink = "";
      try {
        if (chunk?.data && !chunk?.data.includes("DONE")) {
          const message = JSON.parse(chunk?.data);
          currentThink = message?.choices?.[0]?.delta?.reasoning_content || "";
          currentContent = message?.choices?.[0]?.delta?.content || "";
        }
      } catch (error) {
        console.error(error);
      }

      let content = "";

      if (!originMessage?.content && currentThink) {
        content = `<think>${currentThink}`;
      } else if (
        originMessage?.content?.includes("<think>") &&
        !originMessage?.content.includes("</think>") &&
        currentContent
      ) {
        content = `${originMessage?.content}</think>${currentContent}`;
      } else {
        content = `${
          originMessage?.content || ""
        }${currentThink}${currentContent}`;
      }

      return {
        content: content,
        role: "assistant",
      };
    },
    resolveAbortController: (controller) => {
      abortController.current = controller;
    },
  });

  // ==================== Event ====================
  const handleUserSubmit = (val: string) => {
    onRequest({
      stream: true,
      message: { content: val, role: "user" },
    });

    // session title mock
    if (
      sessionList.find((i) => i.key === curSession)?.label === "New session"
    ) {
      setSessionList(
        sessionList.map((i) =>
          i.key !== curSession ? i : { ...i, label: val?.slice(0, 20) }
        )
      );
    }
  };

  const onPasteFile = (_: File, files: FileList) => {
    for (const file of files) {
      attachmentsRef.current?.upload(file);
    }
    setAttachmentsOpen(true);
  };

  // ==================== Nodes ====================
  const chatHeader = (
    <div className={styles.chatHeader}>
      <div className={styles.headerTitle}>AI Disease Navigation</div>
      <Space size={0}>
        {/* <Button
          type="text"
          icon={<PlusOutlined />}
          onClick={() => {
            if (agent.isRequesting()) {
              message.error(
                "Message is Requesting, you can create a new conversation after request done or abort it right now..."
              );
              return;
            }

            if (messages?.length) {
              const timeNow = dayjs().valueOf().toString();
              abortController.current?.abort();
              // The abort execution will trigger an asynchronous requestFallback, which may lead to timing issues.
              // In future versions, the sessionId capability will be added to resolve this problem.
              setTimeout(() => {
                setSessionList([
                  { key: timeNow, label: "New session", group: "Today" },
                  ...sessionList,
                ]);
                setCurSession(timeNow);
                setMessages([]);
              }, 100);
            } else {
              message.error("It is now a new conversation.");
            }
          }}
          className={styles.headerButton}
        /> */}
        {/* <Popover
          placement="bottom"
          styles={{ body: { padding: 0, maxHeight: 600 } }}
          content={
            <Conversations
              items={sessionList?.map((i) =>
                i.key === curSession
                  ? { ...i, label: `[current] ${i.label}` }
                  : i
              )}
              activeKey={curSession}
              groupable
              onActiveChange={async (val) => {
                abortController.current?.abort();
                // The abort execution will trigger an asynchronous requestFallback, which may lead to timing issues.
                // In future versions, the sessionId capability will be added to resolve this problem.
                setTimeout(() => {
                  setCurSession(val);
                  setMessages(messageHistory?.[val] || []);
                }, 100);
              }}
              styles={{ item: { padding: "0 8px" } }}
              className={styles.conversations}
            />
          }
        >
          <Button
            type="text"
            icon={<CommentOutlined />}
            className={styles.headerButton}
          />
        </Popover> */}
        {/* <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => setCopilotOpen(false)}
          className={styles.headerButton}
        /> */}
      </Space>
    </div>
  );
  const chatList = (
    <div className={styles.chatList}>
      {messages?.length ? (
        /** 消息列表 */
        <Bubble.List
          style={{ height: "100%", paddingInline: 16 }}
          items={messages?.map((i) => ({
            ...i.message,
            classNames: {
              content: i.status === "loading" ? styles.loadingMessage : "",
            },
            typing:
              i.status === "loading"
                ? { step: 5, interval: 20, suffix: <>💗</> }
                : false,
          }))}
          roles={{
            assistant: {
              placement: "start",
              footer: (
                <div style={{ display: "flex" }}>
                  <Button type="text" size="small" icon={<ReloadOutlined />} />
                  <Button type="text" size="small" icon={<CopyOutlined />} />
                  <Button type="text" size="small" icon={<LikeOutlined />} />
                  <Button type="text" size="small" icon={<DislikeOutlined />} />
                </div>
              ),
              loadingRender: () => (
                <Space>
                  <Spin size="small" />
                  {AGENT_PLACEHOLDER}
                </Space>
              ),
            },
            user: { placement: "end" },
          }}
        />
      ) : (
        /** 没有消息时的 welcome */
        <>
          {/* <Welcome
            variant="borderless"
            title="👋 Hi, ask me anything about TNBC disease and treatments"
            className={styles.chatWelcome}
          /> */}
          <CustomWelcome />

          <Prompts
            vertical
            title="You may like："
            items={MOCK_QUESTIONS.map((i) => ({ key: i, description: i }))}
            onItemClick={() =>
              // handleUserSubmit(info?.data?.description as string)
              {}
            }
            style={{
              marginInline: 16,
            }}
            styles={{
              title: { fontSize: 14 },
            }}
          />
        </>
      )}
    </div>
  );
  const sendHeader = (
    <Sender.Header
      title="Upload File"
      styles={{ content: { padding: 0 } }}
      open={attachmentsOpen}
      onOpenChange={setAttachmentsOpen}
      forceRender
    >
      <Attachments
        ref={attachmentsRef}
        beforeUpload={() => false}
        items={files}
        onChange={({ fileList }) => setFiles(fileList)}
        placeholder={(type) =>
          type === "drop"
            ? { title: "Drop file here" }
            : {
                icon: <CloudUploadOutlined />,
                title: "Upload files",
                description: "Click or drag files to this area to upload",
              }
        }
      />
    </Sender.Header>
  );
  const chatSender = (
    <div className={styles.chatSend}>
      {/* <div className={styles.sendAction}>
        <Button
          icon={<ScheduleOutlined />}
          onClick={() => handleUserSubmit("What has Ant Design X upgraded?")}
        >
          Upgrades
        </Button>
        <Button
          icon={<ProductOutlined />}
          onClick={() =>
            handleUserSubmit(
              "What component assets are available in Ant Design X?"
            )
          }
        >
          Components
        </Button>
        <Button icon={<AppstoreAddOutlined />}>More</Button>
      </div> */}

      {/** 输入框 */}
      <Suggestion
        items={MOCK_SUGGESTIONS}
        onSelect={(itemVal) => setInputValue(`[${itemVal}]:`)}
      >
        {({ onTrigger, onKeyDown }) => (
          <Sender
            loading={loading}
            value={inputValue}
            onChange={(v) => {
              onTrigger(v === "/");
              setInputValue(v);
            }}
            onSubmit={() => {
              handleUserSubmit(inputValue);
              setInputValue("");
            }}
            onCancel={() => {
              abortController.current?.abort();
            }}
            allowSpeech
            placeholder="Ask or input / use skills"
            onKeyDown={onKeyDown}
            header={sendHeader}
            prefix={
              <Button
                type="text"
                icon={<PaperClipOutlined style={{ fontSize: 18 }} />}
                onClick={() => setAttachmentsOpen(!attachmentsOpen)}
              />
            }
            onPasteFile={onPasteFile}
            actions={(_, info) => {
              const { SendButton, LoadingButton, SpeechButton } =
                info.components;
              return (
                <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <SpeechButton className={styles.speechButton} />
                  {loading ? (
                    <LoadingButton type="default" />
                  ) : (
                    <SendButton type="primary" />
                  )}
                </div>
              );
            }}
          />
        )}
      </Suggestion>
    </div>
  );

  useEffect(() => {
    // history mock
    if (messages?.length) {
      setMessageHistory((prev) => ({
        ...prev,
        [curSession]: messages,
      }));
    }
  }, [messages]);

  return (
    <div
      className={styles.copilotChat}
      style={{ width: copilotOpen ? 400 : 0 }}
    >
      {/** 对话区 - header */}
      {chatHeader}

      {/** 对话区 - 消息列表 */}
      {chatList}

      {/** 对话区 - 输入框 */}
      {chatSender}
    </div>
  );
};

const useWorkareaStyle = createStyles(({ token, css }) => {
  return {
    copilotWrapper: css`
      min-width: 1000px;
      height: 100vh;
      display: flex;
    `,
    workarea: css`
      flex: 1;
      background: ${token.colorBgLayout};
      display: flex;
      flex-direction: column;
    `,
    workareaHeader: css`
      box-sizing: border-box;
      height: 52px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 48px 0 28px;
      border-bottom: 1px solid ${token.colorBorder};
    `,
    headerTitle: css`
      font-weight: 600;
      font-size: 15px;
      color: ${token.colorText};
      display: flex;
      align-items: center;
      gap: 8px;
    `,
    headerButton: css`
      background-image: linear-gradient(78deg, #8054f2 7%, #3895da 95%);
      border-radius: 12px;
      height: 24px;
      width: 93px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      cursor: pointer;
      font-size: 12px;
      font-weight: 600;
      transition: all 0.3s;
      &:hover {
        opacity: 0.8;
      }
    `,
    workareaBody: css`
      flex: 1;
      padding: 16px;
      background: ${token.colorBgContainer};
      border-radius: 16px;
      min-height: 0;
    `,
    bodyContent: css`
      overflow: auto;
      height: 100%;
      padding-right: 10px;
    `,
    bodyText: css`
      color: ${token.colorText};
      padding: 8px;
    `,
  };
});

const CopilotDemo = () => {
  const { styles: workareaStyles } = useWorkareaStyle();

  // ==================== State =================
  const [copilotOpen, setCopilotOpen] = useState(true);

  // ==================== Render =================
  return (
    <div className={workareaStyles.copilotWrapper}>
      {/** 左侧工作区 */}

      {/** 右侧对话区 */}
      <Copilot copilotOpen={copilotOpen} setCopilotOpen={setCopilotOpen} />
    </div>
  );
};

export default CopilotDemo;
