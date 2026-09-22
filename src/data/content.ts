export type Lang = "zh" | "en";

export const repoUrl = "https://github.com/ZCodium-project/ZCodium";
export const upstreamUrl = "https://github.com/zai-org/ZCode";
export const releasesUrl = "https://github.com/ZCodium-project/ZCodium/releases";
export const licenseUrl = `${repoUrl}/blob/main/LICENSE`;
export const apacheLicenseUrl = `${repoUrl}/blob/main/LICENSE-APACHE`;
export const thirdPartyNoticesUrl = `${repoUrl}/blob/main/THIRD-PARTY-NOTICES.md`;

export interface CompareRow {
  item: string;
  audit: string;
  client: string;
  oss: string;
}

export interface WorkItem {
  title: string;
  body: string;
}

export interface Copy {
  nav: {
    downloads: string;
    compare: string;
    changes: string;
    next: string;
  };
  hero: {
    badges: [string, string];
    titleLines: [string, string];
    lead: string;
    leadNote: string;
    download: {
      label: string;
      fallback: string;
    };
    osSuffix: string;
    installHint: string;
    allVersions: string;
    star: string;
    screenshotAlt: string;
  };
  showcase: {
    kicker: string;
    title: string;
    body: string;
    alt: string;
  };
  compare: {
    kicker: string;
    title: string;
    scrollHint: string;
    note: string;
    headers: {
      item: string;
      audit: string;
      client: string;
      oss: string;
    };
    rows: CompareRow[];
  };
  current: {
    kicker: string;
    title: string;
    items: WorkItem[];
  };
  next: {
    kicker: string;
    title: string;
    items: WorkItem[];
  };
  downloads: {
    kicker: string;
    title: string;
    note: string;
    empty: string;
    allLink: string;
    groups: {
      macos: string;
      windows: string;
      linux: string;
      cli: string;
    };
  };
  license: {
    kicker: string;
    title: string;
    intro: string;
    items: { name: string; value: string; href: string }[];
    note: string;
    noteLinkLabel: string;
    noteHref: string;
  };
  footer: {
    disclaimerTitle: string;
    disclaimerBefore: string;
    disclaimerAfter: string;
    links: {
      repo: string;
      upstream: string;
      feedback: string;
    };
  };
}

export const copy: Record<Lang, Copy> = {
  zh: {
    nav: {
      downloads: "下载",
      compare: "对比",
      changes: "改动",
      next: "持续",
    },
    hero: {
      badges: ["独立审计 · 非官方 Fork", "持续跟踪上游"],
      titleLines: ["ZCode 社区纯净版", "重新审查，真开源！"],
      lead: "ZCodium 是一个全新的 ZCode 发行版，保留了多智能体协作、任务编排、插件与技能、MCP 工具接入等优秀能力：从最新公开源码出发，独立审计、移除去监控与遥测后重新构建。桌面安装包、CLI 发行包、改动记录和审计说明都在这里。",
      leadNote: "第一方代码以 MIT 协议开源，上游代码保持 Apache-2.0（详见下方“开源协议”）。ZCodium 基于北京智谱华章科技股份有限公司（Z.AI）开源发布的 ZCode 代码独立审计、独立构建，与该公司没有隶属、授权或背书关系。",
      download: {
        label: "下载 ZCodium",
        fallback: "前往 GitHub Releases 下载",
      },
      osSuffix: " 版",
      installHint: "没有 ZCode 官方签名：拖入“应用程序”后，用 sudo /usr/bin/xattr -rd com.apple.quarantine 放行并自动启动（输入密码时不显示字符）",
      allVersions: "全部版本与安装命令",
      star: "Star",
      screenshotAlt: "ZCodium 完成任务后的对话与改动摘要",
    },
    showcase: {
      kicker: "Inside",
      title: "工具调用、文件改动、审批，全都摊开给你看",
      body: "文件改动带 diff，终端命令带上下文；每次要动你的项目之前，先弹窗征求许可——批准粒度可以是一次、一个项目，或全部放行。",
      alt: "ZCodium 在改动文件前弹出权限确认",
    },
    compare: {
      kicker: "Compare",
      title: "和官方版本的区别",
      scrollHint: "表格可左右滑动查看",
      note: "注：“官方客户端 / 官方开源版”两列的信息来自公开报道与技术分析（出处见仓库 README 的“背景”章节）；“ZCodium”一列为本仓库代码的审计结果。",
      headers: {
        item: "对比项",
        audit: "ZCodium（本仓库）",
        client: "官方客户端（闭源）",
        oss: "官方开源版",
      },
      rows: [
        {
          item: "监控与遥测",
          audit: "全部移除（约 2.6 万行），并加防回归检查",
          client: "据公开报道默认全套开启，界面开关不影响打包上传",
          oss: "与闭源版相同",
        },
        {
          item: "仓库上传逻辑",
          audit: "已移除",
          client: "有（据 2026-09-18 的公开技术分析）",
          oss: "已移除（自 2026-09-21 起）",
        },
        {
          item: "历史版本回溯",
          audit: "保留全部历史版本与提交记录，供审计回溯",
          client: "旧版本下载链接已下架",
          oss: "旧版本下载链接已下架",
        },
        {
          item: "构建透明度",
          audit: "GitHub Actions 从仓库源码透明构建，产物随 Release 发布",
          client: "官方二进制，无法独立复核构建",
          oss: "不提供公开构建",
        },
        {
          item: "Issue 与共建",
          audit: "开放（Issue 与 Discussions），欢迎共建讨论",
          client: "不开放",
          oss: "关闭",
        },
      ],
    },
    current: {
      kicker: "Changes",
      title: "ZCodium 比 ZCode 官方改了什么",
      items: [
        {
          title: "移除全部监控与遥测",
          body: "ARMS RUM、OTLP 上报、崩溃采集、资源与网络采样、UI 埋点全部删除，约 2.6 万行；另外加了防回归检查，防止这些出口被重新引入。",
        },
        {
          title: "官方服务默认全部关闭",
          body: "账号登录、反馈、编码套餐、官方 MCP、插件市场等官方接口默认关闭，设置里可逐个开关。打开任意一个都会连接 ZCode 官方服务器，如无必要请保持关闭。",
        },
        {
          title: "审计敏感路径",
          body: "对快照打包、加密、直传相关的代码做了全仓库检索。当前版本里没有未经确认的数据外发实现。",
        },
        {
          title: "接通构建与发布",
          body: "GitHub Actions 从仓库源码构建安装包、部署本站；应用内更新指向本仓库的 GitHub Releases，走自己的发布链路。",
        },
      ],
    },
    next: {
      kicker: "Ongoing",
      title: "我们会持续审计",
      items: [
        {
          title: "逐提交审阅上游",
          body: "zai-org/ZCode 的每次提交都做 diff 审计，不等发版才看。",
        },
        {
          title: "只同步无风险代码",
          body: "数据外发、监控遥测、权限扩张这类改动会剥离或拒绝合入，并在审计记录里写明原因。",
        },
        {
          title: "同步后重新构建",
          body: "每次同步都会构建并发布新的审计版本，产物全部来自本仓库的源码。",
        },
      ],
    },
    downloads: {
      kicker: "Downloads",
      title: "全部下载",
      note: "全部产物由本仓库构建并发布在 GitHub Releases；文件未签名，首次安装需要按提示放行一次。",
      empty: "正在读取最新版本；也可以直接去 GitHub Releases 查看。",
      allLink: "在 GitHub 查看全部版本与校验文件",
      groups: {
        macos: "macOS",
        windows: "Windows",
        linux: "Linux",
        cli: "CLI 发行包",
      },
    },
    license: {
      kicker: "License",
      title: "开源协议",
      intro: "ZCodium 的代码按来源适用不同协议：",
      items: [
        {
          name: "本仓库第一方代码：审计、改动与新增部分",
          value: "MIT",
          href: licenseUrl,
        },
        {
          name: "上游 ZCode 代码（源自 zai-org/ZCode）",
          value: "Apache-2.0（保留原始版权与署名）",
          href: apacheLicenseUrl,
        },
        {
          name: "第三方组件与素材",
          value: "各自的许可条款",
          href: thirdPartyNoticesUrl,
        },
      ],
      note: "完整声明（衍生关系、修改记录与风险提示）见",
      noteLinkLabel: "NOTICE（中文）",
      noteHref: `${repoUrl}/blob/main/NOTICE.zh-CN.md`,
    },
    footer: {
      disclaimerTitle: "免责声明",
      disclaimerBefore:
        "本站与智谱（北京智谱华章科技股份有限公司）无隶属关系。所有事实陈述来自公开报道与独立代码审计，并已注明出处。如相关方认为内容有误，欢迎通过",
      disclaimerAfter: " 提交更正。",
      links: {
        repo: "审计仓库",
        upstream: "上游仓库",
        feedback: "问题反馈",
      },
    },
  },
  en: {
    nav: {
      downloads: "Download",
      compare: "Compare",
      changes: "Changes",
      next: "Ongoing",
    },
    hero: {
      badges: ["Independent audit · unofficial fork", "Tracking upstream"],
      titleLines: ["ZCode Community Clean Edition", "Re-audited. Truly open source."],
      lead: "ZCodium is a fresh distribution of ZCode that keeps the strong parts — multi-agent collaboration, task orchestration, plugins and skills, MCP tooling — rebuilt from the latest public source after an independent audit, with monitoring and telemetry removed. Desktop installers, a CLI build, the change log and the audit notes all live here.",
      leadNote: "First-party code is MIT-licensed; upstream code stays Apache-2.0 (see “Open-source licensing” below). ZCodium is independently audited and built from the ZCode source code open-sourced by Z.AI Co., Ltd. (Beijing Zhipu Huazhang Technology Co., Ltd.), and has no affiliation, authorization or endorsement from the company.",
      download: {
        label: "Download ZCodium",
        fallback: "Get it from GitHub Releases",
      },
      osSuffix: "",
      installHint: "Not signed by ZCode: after dragging it into Applications, run sudo /usr/bin/xattr -rd com.apple.quarantine to unblock and launch (password input is hidden)",
      allVersions: "All releases and install commands",
      star: "Star",
      screenshotAlt: "A finished ZCodium task with its change summary",
    },
    showcase: {
      kicker: "Inside",
      title: "Tool calls, diffs and approvals, all out in the open",
      body: "File edits come with diffs, terminal runs with context. Before touching your project, ZCodium asks — approve once, for the project, or grant full access.",
      alt: "ZCodium asking for permission before editing a file",
    },
    compare: {
      kicker: "Compare",
      title: "How it compares with upstream",
      scrollHint: "Swipe the table sideways",
      note: "Note: the “official client / official OSS” columns come from public reporting and technical analyses (sources in the repository README); the “ZCodium” column reflects the audit of this repository's code.",
      headers: {
        item: "Item",
        audit: "ZCodium (this repo)",
        client: "Official client (closed source)",
        oss: "Official open source",
      },
      rows: [
        {
          item: "Monitoring and telemetry",
          audit: "All removed (~26k lines), with regression checks",
          client: "Reportedly on by default; UI switches do not affect the packaging/upload path",
          oss: "Same as the closed-source client",
        },
        {
          item: "Repository upload logic",
          audit: "Removed",
          client: "Present (per the public technical analysis of 2026-09-18)",
          oss: "Removed (since 2026-09-21)",
        },
        {
          item: "Historical versions",
          audit: "Full history and releases kept for audit trail",
          client: "Old download links pulled",
          oss: "Old download links pulled",
        },
        {
          item: "Build transparency",
          audit: "GitHub Actions builds transparently from this repo; artifacts ship with releases",
          client: "Vendor binaries; builds cannot be independently verified",
          oss: "No public build",
        },
        {
          item: "Issues and collaboration",
          audit: "Open — issues and discussions welcome",
          client: "Not open",
          oss: "Closed",
        },
      ],
    },
    current: {
      kicker: "Changes",
      title: "What ZCodium changes vs. official ZCode",
      items: [
        {
          title: "Removed all monitoring and telemetry",
          body: "ARMS RUM, OTLP reporting, crash capture, resource and network sampling, UI instrumentation — about 26k lines deleted, with regression checks that keep those exits closed.",
        },
        {
          title: "Vendor services off by default",
          body: "Account sign-in, feedback, coding plans, official MCP and the plugin marketplace are all off by default, each with its own switch in Settings. Turning one on connects to ZCode's official servers — keep them off unless you need them.",
        },
        {
          title: "Audited the sensitive paths",
          body: "Snapshot packaging, encryption and direct-upload code was reviewed across the repository. This version has no unconsented data egress.",
        },
        {
          title: "Wired up builds and releases",
          body: "GitHub Actions builds the installers from this source and deploys this site; in-app updates point at this repo's GitHub Releases.",
        },
      ],
    },
    next: {
      kicker: "Ongoing",
      title: "We keep auditing",
      items: [
        {
          title: "Review every upstream commit",
          body: "Each commit in zai-org/ZCode gets a diff audit, not just releases.",
        },
        {
          title: "Sync risk-free code only",
          body: "Data egress, monitoring/telemetry and permission expansion are stripped or rejected, with the reason recorded.",
        },
        {
          title: "Rebuild after every sync",
          body: "Every sync produces a new audited release built from this repository's source.",
        },
      ],
    },
    downloads: {
      kicker: "Downloads",
      title: "All downloads",
      note: "Every artifact is built from this repository's source and published on GitHub Releases. The files are unsigned — allow them once on first install as prompted.",
      empty: "Loading the latest release; you can also head straight to GitHub Releases.",
      allLink: "All releases and checksums on GitHub",
      groups: {
        macos: "macOS",
        windows: "Windows",
        linux: "Linux",
        cli: "CLI build",
      },
    },
    license: {
      kicker: "License",
      title: "Open-source licensing",
      intro: "Licenses apply to different parts of the codebase by origin:",
      items: [
        {
          name: "First-party code in this repo: audit, changes and additions",
          value: "MIT",
          href: licenseUrl,
        },
        {
          name: "Upstream ZCode code (from zai-org/ZCode)",
          value: "Apache-2.0, original copyright and attribution retained",
          href: apacheLicenseUrl,
        },
        {
          name: "Third-party components and assets",
          value: "their own license terms",
          href: thirdPartyNoticesUrl,
        },
      ],
      note: "For the full statement (derivative work, modification record and risk notes) see",
      noteLinkLabel: "NOTICE",
      noteHref: `${repoUrl}/blob/main/NOTICE.md`,
    },
    footer: {
      disclaimerTitle: "Disclaimer",
      disclaimerBefore:
        "Not affiliated with Zhipu (Beijing Zhipu Huazhang Technology Co., Ltd.). All statements come from public reporting and independent code review, with sources cited. If anything looks wrong, open an",
      disclaimerAfter: ".",
      links: {
        repo: "Repository",
        upstream: "Upstream",
        feedback: "Feedback",
      },
    },
  },
};
