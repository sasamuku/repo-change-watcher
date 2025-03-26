# PR Change History (2025-03-26)

## 2025-03-26

- [#244700](https://github.com/microsoft/vscode/pull/244700) Ignore focus lost in Setup GHE input (@TylerLeonhardt)
  > **AI Summary**: This Pull Request modifies the chatSetup.ts file in the VS Code repository to ignore focus lost in the Setup GHE input. The purpose of this change is to improve the user experience when setting up GitHub Enterprise in VS Code. The impact areas of this PR are limited to the chat feature within the workbench.

- [#244697](https://github.com/microsoft/vscode/pull/244697) The final frontier (@TylerLeonhardt)
  > **AI Summary**: This Pull Request titled "The final frontier" addresses and fixes issue #14847 in the vscode-copilot repository. The main change involves modifying the fetchPageTool.ts file in the chat/electron-sandbox/tools directory. The purpose of the PR is to resolve the specified issue and ensure that the code is up-to-date with the main branch. The impact areas include improving the functionality of the fetchPageTool and potentially enhancing the overall user experience in the chat feature of VS Code.

- [#244693](https://github.com/microsoft/vscode/pull/244693) Fix "cancel" action on "Show Chats" with active editing session (@roblourens)
  > **AI Summary**: This Pull Request fixes the "cancel" action on the "Show Chats" feature in VS Code with an active editing session. The main change is in the chatActions.ts file, with 3 lines added and 1 line modified. The purpose is to address issue #14998 and ensure that the cancel action works correctly during an editing session. This fix improves the user experience and functionality of the chat feature in VS Code.

- [#244691](https://github.com/microsoft/vscode/pull/244691) Restore builtin tool custom confirmations (@roblourens)
  > **AI Summary**: This Pull Request restores the builtin tool custom confirmations in the fetch tool and disables 'auto allow'. The main changes involve bringing back the fetch tool's nicer confirmation and custom logic. Impact areas include modifications to languageModelToolsService files and the fetchPageTool.

- [#244685](https://github.com/microsoft/vscode/pull/244685) Don't show builtin agent tools in the picker (@roblourens)
  > **AI Summary**: This Pull Request aims to prevent the display of built-in agent tools in the picker. The changes involve modifications to several files related to chat functionality and language model tools. The impact of this PR is to improve the user experience by filtering out unnecessary tools from the picker interface.

- [#244683](https://github.com/microsoft/vscode/pull/244683) mcp: normalize invalid tool names (@connor4312)
  > **AI Summary**: This Pull Request titled "mcp: normalize invalid tool names" addresses issue #15004 in the vscode-copilot repository. The main change involves normalizing invalid tool names in the mcpServer.ts file. This change aims to improve the functionality and reliability of the MCP (Model, Code, and Process) feature in Visual Studio Code. The impact areas include enhancing the user experience by ensuring that tool names are correctly handled within the MCP server.

- [#244682](https://github.com/microsoft/vscode/pull/244682) Avoid unnecessary editor relayouts (@roblourens)
  > **AI Summary**: This PR aims to prevent unnecessary editor relayouts in the chat widget. The changes made in the chatListRenderer.ts file reduce the extra work and improve performance when switching tabs. This will lead to a smoother user experience and more efficient use of resources.

- [#244681](https://github.com/microsoft/vscode/pull/244681) Fix cut off terminal editors/buttons (@roblourens)
  > **AI Summary**: This Pull Request aims to fix the issue of cut off terminal editors/buttons in the vscode-copilot-release repository. The main change is made in the codeBlockPart.ts file. The purpose is to address the reported issue and ensure that no other functionalities are affected. The impact areas include improving the user experience by resolving the cut off terminal editors/buttons problem.

- [#244676](https://github.com/microsoft/vscode/pull/244676) Only show chat status details in faded color (@mjbvz)
  > **AI Summary**: This Pull Request modifies the chatStatus.css file to only show chat status details in faded color. The purpose of this change is to improve the visual appearance of chat status details in the VS Code workspace. This change will impact the way chat status details are displayed to users, making them easier to read and less distracting.

- [#244675](https://github.com/microsoft/vscode/pull/244675) mcp: turn on mcp discovery by default (@connor4312)
  > **AI Summary**: This Pull Request updates the MCP discovery feature to be turned on by default. It was verified with @kieferrm that this change is desired for the next release. The main impact areas are in the chat and MCP discovery modules.

- [#244667](https://github.com/microsoft/vscode/pull/244667) Always show expandable input/output for 3P tools (@roblourens)
  > **AI Summary**: This Pull Request updates the language model tools service in VS Code to always show expandable input/output for third-party tools. Changes include modifications to several files and the addition of a new file for prompt TSX types. The purpose is to improve the user experience when using external tools within the editor.


## 2025-03-25

- [#244677](https://github.com/microsoft/vscode/pull/244677) change feedack name to feedback.enabled (@justschen)
  > **AI Summary**: This Pull Request changes the name of a feedback variable to "feedback.enabled" in multiple files within the VS Code repository. The purpose of this change is to fix an issue related to feedback functionality. The impact areas include telemetry, chat actions, issue contributions, relauncher, and surveys within the VS Code workspace.

- [#244671](https://github.com/microsoft/vscode/pull/244671) drag and drop url fixes (@justschen)
  > **AI Summary**: This Pull Request addresses issues related to drag and drop functionality for URLs in the VS Code chat feature. The changes include fixes for specific issues identified in GitHub, with modifications made to the chatDragAndDrop.ts file. The impact of these changes is improved drag and drop functionality for URLs within the chat feature.

- [#244660](https://github.com/microsoft/vscode/pull/244660) add prompt "action" buttons to allow to manage current prompts (@legomushroom)
  > **AI Summary**: This PR adds prompt "action" buttons to allow managing current prompts in VS Code Copilot. It includes changes to multiple files related to chat prompts, dialogs, and prompt syntax contributions. The purpose is to enhance the user experience by providing easier management of prompts within the chat interface. The impact areas include improved usability and functionality for users interacting with prompts in the VS Code Copilot extension.

- [#244661](https://github.com/microsoft/vscode/pull/244661) Validate ChatMode (@roblourens)
  > **AI Summary**: This Pull Request aims to validate the ChatMode to prevent displaying 'undefined' in the picker or allowing an invalid argument to the command directly. Changes were made to three files related to chat functionality in the VS Code workbench. The impact of this PR is to improve the user experience by ensuring proper validation of chat modes.

- [#240508](https://github.com/microsoft/vscode/pull/240508) fix: use the copy command for images with CORS errors in the markdown preview (@notoriousmango)
  > **AI Summary**: This PR fixes the issue of CORS errors with images in the markdown preview by using the copy command to retrieve the image from a canvas. If selection does not exist, the image source is copied to the clipboard. The main change is in the index.ts file in the markdown-language-features extension.

- [#244652](https://github.com/microsoft/vscode/pull/244652) show user prompt synchronization suggestion only if settings sync service is enabled (@legomushroom)
  > **AI Summary**: This PR modifies the createPromptCommand.ts file to only show user prompt synchronization suggestion if the settings sync service is enabled. It addresses issue #14853 on the vscode-copilot repository. The main impact area is in the user prompt synchronization feature within the chat browser.

- [#244653](https://github.com/microsoft/vscode/pull/244653) mcp: small tpi fixes (@connor4312)
  > **AI Summary**: This pull request includes small fixes to the TPI (Task Provider Interface) in multiple files within the MCP (Multi-Command Palette) feature. The changes aim to improve the functionality and reliability of the MCP feature. The impact areas include the mainThreadMcp, mcpCommands, workspaceMcpDiscoveryAdapter, mcpConfigPathsService, and mcpRegistryInputStorage files.

- [#242074](https://github.com/microsoft/vscode/pull/242074) Fix Incorrect character indentation on settings with line break (@notoriousmango)
  > **AI Summary**: This Pull Request fixes incorrect character indentation on settings with line breaks. The main change is in the releaseNotesEditor.ts file, with a modification that addresses the issue. The impact is a visual improvement in the display of settings with line breaks.

- [#242500](https://github.com/microsoft/vscode/pull/242500) Remove old TS surveys setting (@mjbvz)
  > **AI Summary**: This Pull Request removes an old TypeScript surveys setting that has not been used for a while. The changes impact the package.json and package.nls.json files in the typescript-language-features extension. This update helps clean up unused settings and potentially improve the overall performance of the extension.

- [#244627](https://github.com/microsoft/vscode/pull/244627) Fixes #244570 (@hediet)
  > **AI Summary**: This pull request fixes issue #244570 by making modifications to the base.ts file in the observableInternal folder. The changes include adding 28 lines of code and removing 2 lines. The impact of this fix is to address the issue identified in #244570 within the observableInternal functionality.

- [#244614](https://github.com/microsoft/vscode/pull/244614) chat: fix 'select tools' bucketing mcp servers incorrectly (@connor4312)
  > **AI Summary**: This PR fixes an issue where the 'select tools' bucketing in the chat feature was incorrectly assigning servers. The toolBuckets in the pick now correctly use the server definition ID, but the selected tool model was still only using the collection ID. Impact areas include the chat feature and MCP service.

- [#244499](https://github.com/microsoft/vscode/pull/244499) node-pty@1.1.0-beta33 (@Tyriar)
  > **AI Summary**: This Pull Request updates the node-pty package to version 1.1.0-beta33, addressing issue #243584. Changes were made to package-lock.json and package.json files in both the main and remote directories. The purpose of this update is to fix the specified issue and ensure the code is up-to-date with the main branch. Testing instructions were also provided.

- [#244302](https://github.com/microsoft/vscode/pull/244302) Add chat status API proposal (@mjbvz)
  > **AI Summary**: This PR adds a new proposal for extensions to contribute basic status items to the chat status dashboard. It includes changes to multiple files to implement this feature, such as adding new files for chat status handling and modifying existing files related to extensions and chat status. The impact of this PR is to enhance the chat status dashboard with additional functionality for extensions to provide status updates.

- [#244562](https://github.com/microsoft/vscode/pull/244562) fix parsing policies (@sandy081)
  > **AI Summary**: This PR fixes parsing policies by modifying the tree-sitter query to handle different localize() calls, fixing policy settings to include required descriptions, and updating policy settings to pass the configuration node directly. The changes impact files related to policies, configuration, and chat contributions.

- [#244553](https://github.com/microsoft/vscode/pull/244553) fire height change event when tool selection changes (@jrieken)
  > **AI Summary**: This pull request modifies the chatInputPart.ts file to fire a height change event when the tool selection changes in VS Code. This change aims to improve the user experience by dynamically adjusting the height of the chat input part based on the selected tool, potentially impacting the layout and usability of the chat feature.

- [#244041](https://github.com/microsoft/vscode/pull/244041) support attach cell output in copilot (@eleanorjboyd)
  > **AI Summary**: This PR adds support for attaching notebook output as context in a chat request in Copilot. Changes were made to multiple files related to notebook functionality, including adding new features and modifying existing code to enable this functionality. The impact of this PR is that users can now easily share notebook output in chat requests, enhancing collaboration and communication within the Copilot tool.

- [#244532](https://github.com/microsoft/vscode/pull/244532) Show custom confirm dialog when closing chat editor with active edits (@roblourens)
  > **AI Summary**: This Pull Request adds a custom confirm dialog when closing the chat editor with active edits, prevents opening edited files when in a chat editor, and ensures the correct saving of chat editor view state. Changes were made to multiple files related to chat editing functionality. The impact areas include improving user experience and preventing accidental data loss in the chat editor.

- [#244529](https://github.com/microsoft/vscode/pull/244529) Delete Unused API (@TylerLeonhardt)
  > **AI Summary**: This Pull Request titled "Delete Unused API" removes unused API code from various files in the repository. The changes impact multiple files by removing unnecessary code related to API proposals, URLs, and protocol implementations. The purpose of this PR is to clean up the codebase by removing unused functionality, potentially improving performance and reducing complexity.

- [#244528](https://github.com/microsoft/vscode/pull/244528) Enable edits2 by default (@roblourens)
  > **AI Summary**: This Pull Request enables edits2 by default in the chat.contribution.ts file. The main change is the modification of this file to include this feature. The purpose of this change is to improve the editing experience in the chat feature of the VS Code workspace. The impact areas include enhancing user productivity and efficiency when editing messages in the chat.


## 2025-03-24

- [#244524](https://github.com/microsoft/vscode/pull/244524) adding preview tag to mcp enabled setting (@sbatten)
  > **AI Summary**: This pull request adds a preview tag to the MCP enabled setting in the chat contribution file. The purpose of this change is to provide a visual indicator for the MCP enabled setting. This change will impact the user experience by making it easier to identify the status of the MCP enabled setting in the chat feature.

- [#244315](https://github.com/microsoft/vscode/pull/244315) Add `AccountPolicyService` (@joshspicer)
  > **AI Summary**: This Pull Request adds a new `AccountPolicyService` to the codebase, allowing for the implementation of account policy logic. It also introduces a `MultiplexPolicyService` to utilize both the existing `NativePolicyService` and the new `AccountPolicyService`. The changes enable the addition of policies for configurations that do not exist in the core by modifying `product.json`. The impact areas include modifications to various files related to policy handling and configuration management.

- [#244507](https://github.com/microsoft/vscode/pull/244507) Pick up latest md language server (@mjbvz)
  > **AI Summary**: This Pull Request updates the markdown language server to the latest version. The changes are made in the package-lock.json and package.json files. The purpose of this update is to ensure that the markdown language server is up-to-date and functioning properly. The impact areas include improved performance and compatibility with the latest features and enhancements in the language server.

- [#244504](https://github.com/microsoft/vscode/pull/244504) Require confirmation for 3P tools (@roblourens)
  > **AI Summary**: This PR requires confirmation for third-party tools by adding a confirmation message that must be displayed. The main changes are in the languageModelToolsService files, with the impact being that 3P tools will now have to show a confirmation message before being allowed.

- [#244492](https://github.com/microsoft/vscode/pull/244492) mcp: remove vscode_editing tag to allow deselection (@connor4312)
  > **AI Summary**: This Pull Request removes the vscode_editing tag in order to allow for deselection. The main change is in the mcpService.ts file. The purpose of this change is to improve the user experience by enabling deselection. This change impacts the MCP (Multi-Command Palette) functionality in Visual Studio Code.

- [#244509](https://github.com/microsoft/vscode/pull/244509) [css/html/json] update services (@aeschli)
  > **AI Summary**: This Pull Request updates the services for CSS, HTML, and JSON language features in the VS Code extension. Changes include modifications to package-lock.json and package.json files for each language feature, with updates to dependencies and versions. Impact areas include improved functionality and performance for CSS, HTML, and JSON language support within VS Code.

- [#244510](https://github.com/microsoft/vscode/pull/244510) mcp: add setting to enable or disable mcp (@connor4312)
  > **AI Summary**: This Pull Request adds a setting to enable or disable the MCP (Microsoft Cloud Policy) feature in the VS Code editor. The changes are made in the chat.contribution.ts, mcpDiscovery.ts, and mcpConfiguration.ts files. This update allows users to control the MCP functionality within the editor, providing more flexibility and customization options.

- [#244508](https://github.com/microsoft/vscode/pull/244508) mcp: allow canceling server during startup (@connor4312)
  > **AI Summary**: This Pull Request allows for the cancellation of a server during startup in the MCP (Managed Cloud Platform) component of VS Code. The main change is in the mcpLanguageFeatures.ts file, with 7 lines added. This change will impact the functionality and stability of server startup in the MCP feature of VS Code.

- [#244490](https://github.com/microsoft/vscode/pull/244490) apply existing label, doc, and detail to inline completion  (@meganrogge)
  > **AI Summary**: This Pull Request applies existing labels, documentation, and details to inline completion. It includes fixes for builtins and executables. The main changes are made in the `terminalSuggestMain.ts` and `terminalSuggestAddon.ts` files. The purpose is to improve the inline completion functionality for terminal suggestions.

- [#244506](https://github.com/microsoft/vscode/pull/244506) Fix webview leak warnings (@mjbvz)
  > **AI Summary**: This pull request addresses issue #242034 by fixing webview leak warnings in the specified files. The changes involve modifying code in mainThreadCustomEditors.ts, mainThreadWebviewPanels.ts, and overlayWebview.ts. The impact of these changes is to prevent memory leaks and improve the stability of the webview functionality in the application.

- [#244503](https://github.com/microsoft/vscode/pull/244503) Fix tool confirmation AllowSession (@roblourens)
  > **AI Summary**: This Pull Request fixes the tool confirmation AllowSession in the chatToolInvocationPart.ts file. The main change involves modifying the code in this file. The purpose of this PR is to address an issue related to tool confirmation in the chat feature. The impact area is within the chat functionality of the VS Code workbench.

- [#244310](https://github.com/microsoft/vscode/pull/244310) on bin change, update terminal suggest path executable cache (@meganrogge)
  > **AI Summary**: This pull request addresses issue #240129 by updating the terminal suggest path executable cache when there is a change in the bin directory. The main changes include modifications to pathExecutableCache.ts, terminalSuggestMain.ts, and pathExecutableCache.test.ts files. This update will ensure that the terminal suggestions are accurate and up-to-date, improving the overall user experience.

- [#244502](https://github.com/microsoft/vscode/pull/244502) mcp: fix remote sse connections not working (@connor4312)
  > **AI Summary**: This Pull Request fixes an issue with remote server-sent events connections not working by including eventsource-umd with the server. The main changes include modifications to remote/package-lock.json and remote/package.json files. This change will ensure that remote server-sent events connections work properly.

- [#244500](https://github.com/microsoft/vscode/pull/244500) prefix alert with action required (@meganrogge)
  > **AI Summary**: This PR modifies the languageModelToolsService.ts file in the chat browser of the workbench contrib folder. The main change is adding a prefix "action required" to alerts. The purpose of this change is to clearly indicate when user action is needed in alerts. This change will impact the way alerts are displayed to users in the chat browser, making it easier for them to identify when action is required.

- [#244420](https://github.com/microsoft/vscode/pull/244420) make sure that addFile supports images (@justschen)
  > **AI Summary**: This Pull Request addresses the issue of adding support for images in the `addFile` function. Changes were made to multiple files in the `chat` and `inlineChat` components to enable this functionality. The impact of this PR is that users will now be able to add images using the `addFile` feature in the chat interface.

- [#243816](https://github.com/microsoft/vscode/pull/243816) drag and drop from external URLs (@justschen)
  > **AI Summary**: This Pull Request addresses issues #240025 and #242039 by enabling drag and drop functionality from external URLs in VS Code. Changes include modifications to various files related to web content extraction, chat attachment widgets, and drag and drop behavior. The addition of a new sharedWebContentExtractorService enhances the overall user experience when interacting with external content.

- [#244497](https://github.com/microsoft/vscode/pull/244497) Show the url (@TylerLeonhardt)
  > **AI Summary**: This Pull Request fixes an issue related to the URL in the vscode-copilot extension. The main change is in the fetchPageTool.ts file, with modifications to improve the URL functionality. The impact of this PR is to ensure that the URL is displayed correctly in the extension, addressing the issue reported in https://github.com/microsoft/vscode-copilot/issues/14549.

- [#244498](https://github.com/microsoft/vscode/pull/244498) mcp: add diagnostics for bad variable replacements (@connor4312)
  > **AI Summary**: This pull request adds diagnostics for bad variable replacements by moving Levenshtein distance into the common `diff` for reuse. Changes include modifications to various files related to MCP, notebook cell matching, and configuration resolver services. The impact is improved error detection and handling for variable replacements.

- [#244496](https://github.com/microsoft/vscode/pull/244496) Add mcp under chat feature settings (@rzhao271)
  > **AI Summary**: This PR adds the mcp setting to the chat feature settings in the table of contents of the Settings editor. The main change is in the settingsLayout.ts file. This update allows users to easily access and modify the mcp setting within the Settings editor.

- [#244483](https://github.com/microsoft/vscode/pull/244483) fix terminal suggest telemetry issues (@meganrogge)
  > **AI Summary**: This pull request fixes issues related to terminal suggest telemetry. Changes were made to two files, with modifications to improve functionality and address any existing issues. The impact areas include the terminal suggest feature and telemetry data collection in the browser.

- [#244493](https://github.com/microsoft/vscode/pull/244493) Change exactMatch to non-nullable (@rzhao271)
  > **AI Summary**: This pull request changes the exactMatch property to be non-nullable in multiple files related to preferences and settings in the workbench. The impact of this change is likely to improve type safety and prevent potential null-related errors in the codebase.

- [#244487](https://github.com/microsoft/vscode/pull/244487) fix tools picker (@jrieken)
  > **AI Summary**: This pull request modifies the chatToolActions.ts file to fix the tools picker. The purpose of the change is to address an issue with the tools picker functionality. The impact area of this PR is limited to the chat feature within the workbench, specifically affecting how tools are selected in the chat interface.

- [#244484](https://github.com/microsoft/vscode/pull/244484) Email regex update (@lramos15)
  > **AI Summary**: This Pull Request updates the email regex in the telemetryUtils.ts file to be more robust. The main change is in the src/vs/platform/telemetry/common/telemetryUtils.ts file. This update aims to improve the accuracy of email validation within the codebase.

- [#244480](https://github.com/microsoft/vscode/pull/244480) perf: avoid error stack collection for perf and unresponsive errors (@deepak1556)
  > **AI Summary**: This pull request aims to improve performance by avoiding error stack collection for perf and unresponsive errors. The changes are made in the profilingTelemetrySpec.ts and windowImpl.ts files. This update will likely reduce overhead and improve the overall responsiveness of the application.

- [#244478](https://github.com/microsoft/vscode/pull/244478) update to March milestone (@amunger)
  > **AI Summary**: This Pull Request updates a notebook to the March milestone, ensuring all other notebooks are already up to date. The main change is in the endgame.github-issues notebook. The purpose is to keep all notebooks current and aligned with the March milestone. The impact area is on the endgame.github-issues notebook specifically.

- [#244476](https://github.com/microsoft/vscode/pull/244476) fix #244295 (@sandy081)
  > **AI Summary**: This pull request fixes issue #244295 by making a modification to the settingsTreeModels.ts file in the preferences browser of the workbench. The impact of this change is a small adjustment to the code that addresses the specified issue.

- [#244474](https://github.com/microsoft/vscode/pull/244474) bump distro for OSS tool run (@amunger)
  > **AI Summary**: This PR updates the distribution version for an open-source tool run. The main change is in the package.json file, with 2 additions and 2 deletions. The purpose of this update is to ensure that the tool is using the latest distribution version. The impact areas include potential improvements in performance, security, and compatibility with other dependencies.

- [#244475](https://github.com/microsoft/vscode/pull/244475) chat - show copilot view when triggering setup outside of chat (@bpasero)
  > **AI Summary**: This Pull Request modifies the chatSetup.ts file to show the copilot view when triggering setup outside of the chat. The purpose of this change is to improve the user experience by providing access to the copilot view in a more convenient way. The impact areas of this PR include the chat feature within the VS Code workbench.

- [#244144](https://github.com/microsoft/vscode/pull/244144) fix: re-enable PlzDedicatedWorker feature (@deepak1556)
  > **AI Summary**: This PR fixes an issue with the PlzDedicatedWorker feature in VS Code. Changes were made to several files to re-enable this feature, with modifications made to src/main.ts, src/vs/workbench/contrib/webview/browser/pre/index-no-csp.html, src/vs/workbench/contrib/webview/browser/pre/index.html, and src/vs/workbench/contrib/webview/browser/pre/service-worker.js. The impact of this PR is that the PlzDedicatedWorker feature will now work as intended in VS Code.

- [#244471](https://github.com/microsoft/vscode/pull/244471) OSS tool run result (@amunger)
  > **AI Summary**: This Pull Request modifies the ThirdPartyNotices.txt file in two locations, adding 50 lines and removing 3 lines in one location, and adding 10 lines and removing 8 lines in another location. The purpose of the changes is to update the OSS tool run result. The impact areas of this PR are the ThirdPartyNotices.txt files in the specified locations.

- [#244470](https://github.com/microsoft/vscode/pull/244470) Fix non-transparent background in inline edits (@benibenj)
  > **AI Summary**: This PR fixes the issue of a non-transparent background in inline edits by adjusting background rendering to maintain transparency. The changes include modifications to background calculations and border styling for improved visual consistency. The impact area is in the inline edits feature, specifically in the view for word replacement.

- [#244466](https://github.com/microsoft/vscode/pull/244466) Change indicator rendering (@benibenj)
  > **AI Summary**: This PR updates the rendering of the inline edit indicator in the editor to improve its visual representation and positioning. It introduces a new method for creating the icon path and streamlines the overlay widget setup. The main impact areas are in the visual appearance and functionality of the inline edit indicator within the editor.

- [#244465](https://github.com/microsoft/vscode/pull/244465) Actually add disposables to tree sitter editors map (@alexr00)
  > **AI Summary**: This pull request modifies the treeSitterCodeEditors.ts file to actually add disposables to the tree sitter editors map. The purpose of this change is to ensure proper management of resources and improve the overall performance and stability of the tree sitter editors. The impact areas of this PR include better memory management and potentially reducing memory leaks in the tree sitter editors.

- [#244463](https://github.com/microsoft/vscode/pull/244463) fixes in handling gallery service capabilities (@sandy081)
  > **AI Summary**: This pull request includes fixes in handling gallery service capabilities. Changes were made to multiple files related to extensions and extension management, with modifications to improve functionality and address issues in the handling of extension queries and gallery manifest services. The impact areas of this PR include improved reliability and performance in managing extensions within the workspace.

- [#244451](https://github.com/microsoft/vscode/pull/244451) Don't throw when line tokens is constructed with invalid length (@alexr00)
  > **AI Summary**: This pull request addresses an issue where an error was thrown when constructing line tokens with an invalid length. The changes made in the file lineTokens.ts prevent this error from occurring. This modification will improve the stability and reliability of the code related to line tokens in the editor.

- [#241390](https://github.com/microsoft/vscode/pull/241390) chore: log js stacks from unresponsive window (@deepak1556)
  > **AI Summary**: This PR addresses the issue of logging JavaScript stacks from unresponsive windows in VS Code. The main changes include modifications to several files related to network, environment, protocol service, and window management. The purpose is to improve debugging by providing detailed logs when detecting unresponsive windows. The impact areas are in the logging functionality and potentially in the performance of handling unresponsive windows.

- [#244447](https://github.com/microsoft/vscode/pull/244447) Engineering - only run unit tests on Webkit (@lszomoru)
  > **AI Summary**: This Pull Request modifies the Azure Pipelines configuration files for both macOS and Windows to only run unit tests on Webkit. This change aims to streamline the testing process and improve efficiency by focusing on a specific testing environment. The impact areas include the testing process and overall development workflow for the project.

- [#244446](https://github.com/microsoft/vscode/pull/244446) Remove padding from line replacement view (@benibenj)
  > **AI Summary**: This pull request removes padding from the line replacement view in order to improve layout precision. It addresses issue #14623 in the vscode-copilot repository. The main change is in the inlineEditsLineReplacementView.ts file, with a reduction of 28 lines and addition of 9 lines. This change will impact the visual appearance and alignment of the line replacement view in the editor.

- [#244443](https://github.com/microsoft/vscode/pull/244443) Fix problem where the editor would not emit a focus loss event when the model would be cleared (@alexdima)
  > **AI Summary**: This Pull Request fixes an issue where the editor in VS Code was not emitting a focus loss event when the model was cleared. The main change is in the codeEditorWidget.ts file, with a modification of +10 and -2 lines of code. This fix ensures that the editor behaves correctly when the model is cleared, improving the overall user experience.

- [#244433](https://github.com/microsoft/vscode/pull/244433) chat - setup tweaks (@bpasero)
  > **AI Summary**: This Pull Request focuses on making setup tweaks to the chat feature in the VS Code workspace. Changes include modifications to various chat-related files to improve functionality and user experience. The impact areas of this PR are primarily in the chat interface and its associated actions, content parts, input, setup, and status.

- [#244440](https://github.com/microsoft/vscode/pull/244440) Fix custom dialog button hover issue (@benibenj)
  > **AI Summary**: This pull request fixes an issue with button hovers being obscured in a custom dialog by adjusting the z-index of the dialog. The main change is in the dialog.css file. This fix will ensure that button hovers appear above the dialog, improving user experience.

- [#244438](https://github.com/microsoft/vscode/pull/244438) validation position before using it (@jrieken)
  > **AI Summary**: This pull request modifies the textModel.ts and inlineChatCurrentLine.ts files to validate the position before using it. The purpose of this change is to ensure that the position is valid before any operations are performed, which can help prevent errors and improve the overall stability of the codebase. The impact areas of this change are likely to be in the editor and inline chat functionality, where position validation is crucial for correct behavior.

- [#244437](https://github.com/microsoft/vscode/pull/244437) try fixing https://github.com/microsoft/vscode-copilot/issues/13299 (@jrieken)
  > **AI Summary**: This pull request aims to fix issue #13299 in the vscode-copilot repository by making modifications to the chatListRenderer.ts file in the chat browser component. The impact of this change is to address the specific issue reported and improve the functionality of the chat feature in the VS Code Copilot extension.

- [#244436](https://github.com/microsoft/vscode/pull/244436) fix getting response header value (@sandy081)
  > **AI Summary**: This pull request modifies the extensionGalleryService.ts file to fix an issue with getting response header values. The impact of this change is to improve the functionality of retrieving header values in the extension management process.

- [#244435](https://github.com/microsoft/vscode/pull/244435) Reorder menu and remove separator (@benibenj)
  > **AI Summary**: This PR reorders menu items and removes separators in the gutterIndicatorMenu component of the inlineCompletions feature in the editor. The changes aim to improve clarity and remove unnecessary elements from the menu. The impact areas include improved user experience and visual organization in the editor.

- [#244430](https://github.com/microsoft/vscode/pull/244430) make TextModel line methods forgiving (like range methods) (@jrieken)
  > **AI Summary**: This pull request modifies the TextModel line methods in the src/vs/editor/common/model/textModel.ts file to be forgiving, similar to range methods. The impact of this change is that the line methods will now behave more consistently and handle errors more gracefully.

- [#244429](https://github.com/microsoft/vscode/pull/244429) chat - rename setup agent back to original name (@bpasero)
  > **AI Summary**: This Pull Request renames the setup agent back to its original name in the chat feature of VS Code. The changes impact the chatSetup.ts and chatAgents.ts files, with a total of +11 additions and -2 deletions. The purpose of this PR is to revert the name change and ensure consistency within the codebase.

- [#244427](https://github.com/microsoft/vscode/pull/244427) fix leak (@sandy081)
  > **AI Summary**: This PR fixes a leak in the defaultAccount.ts file by making modifications that result in a net change of +2 additions and -2 deletions. The purpose of the PR is to address the leak issue in the codebase, potentially improving the overall stability and performance of the application. The impact areas of this change are likely related to account management functionality within the workbench services.

- [#244425](https://github.com/microsoft/vscode/pull/244425) fixes https://github.com/microsoft/vscode-copilot/issues/14688 (@jrieken)
  > **AI Summary**: This pull request fixes an issue related to inline chat in the VS Code Copilot extension. The main change is in the inlineChatSessionServiceImpl.ts file, with 6 additions and 1 deletion. The impact area is likely to improve the functionality and user experience of inline chat within the extension.

- [#244424](https://github.com/microsoft/vscode/pull/244424) disable code lens while rewriting file from edits (@jrieken)
  > **AI Summary**: This pull request disables code lens while rewriting a file from edits, addressing an issue in the vscode-copilot repository. The main change is in the chatEditingCodeEditorIntegration.ts file, with 7 additions and 6 deletions. This change aims to improve the editing experience and potentially enhance performance in the chat feature of the workbench.

- [#244414](https://github.com/microsoft/vscode/pull/244414) Save on accept of notebook (@DonJayamanne)
  > **AI Summary**: This Pull Request fixes an issue related to saving modified notebooks in VS Code. The main change is in the file chatEditingModifiedNotebookEntry.ts, with a total of 17 lines added. The purpose is to address the specific issue reported in GitHub issue #244246. The impact area is on the functionality of saving modified notebooks in the VS Code chat editing feature.

- [#244417](https://github.com/microsoft/vscode/pull/244417) Capitalize labels (@roblourens)
  > **AI Summary**: This PR capitalizes labels in the chatMarkdownContentPart.ts file, impacting the appearance of labels in the chat feature of the workbench.

- [#244415](https://github.com/microsoft/vscode/pull/244415) Restore unresolved edit session entries to disk (@roblourens)
  > **AI Summary**: This Pull Request addresses issue #244403 by restoring unresolved edit session entries to disk in the chatEditingSession.ts file. The main change involves fixing a specific issue related to unresolved edit session entries. This change will impact the functionality of chat editing sessions in the VS Code workbench, ensuring that unresolved entries are properly saved to disk.

- [#244405](https://github.com/microsoft/vscode/pull/244405) Ensure internal Ids are in sync for new cells inseretd by user (@DonJayamanne)
  > **AI Summary**: This Pull Request ensures that internal Ids are synchronized for new cells inserted by the user. Changes were made to the chatEditingModifiedNotebookEntry.ts and notebookCellMatching.ts files. The purpose of this PR is to maintain consistency and accuracy in the internal Ids of cells, impacting the functionality and reliability of the user's experience when working with notebooks in VS Code.

- [#244402](https://github.com/microsoft/vscode/pull/244402) Adjust cell indexes when inserting a new cell (@DonJayamanne)
  > **AI Summary**: This Pull Request adjusts cell indexes when inserting a new cell in the VS Code Copilot extension. It fixes an issue related to cell indexing and includes changes to the `helpers.ts` and `chatEditingModifiedNotebookEntry.test.ts` files. The impact areas are in the chat editing functionality of the extension.

- [#244401](https://github.com/microsoft/vscode/pull/244401) Fix issues with moving chat editors (@roblourens)
  > **AI Summary**: This Pull Request fixes issues related to moving chat editors in the VS Code workspace. The changes include modifications to the chatMoveActions.ts and chatEditorInput.ts files. The impact areas of this PR are improved functionality and user experience when moving chat editors within the workspace.

- [#244399](https://github.com/microsoft/vscode/pull/244399) Fix request attachment pill layout issue (@roblourens)
  > **AI Summary**: This Pull Request fixes a layout issue with request attachment pills by restoring previous styles and scoping the fix to just the input. The main impact area is in the chat interface, specifically affecting the layout of attachment pills in the input field. The changes are made in the chat.css file.

- [#244398](https://github.com/microsoft/vscode/pull/244398) Fix issues with CollapsedCodeBlock rendering (@roblourens)
  > **AI Summary**: This PR fixes issues with the rendering of collapsed code blocks in the chat feature. The code now checks for the edit session restoration before rendering the code block to prevent issues with the spinner restarting. The changes impact the chatMarkdownContentPart and chatViewModel files, with modifications to improve the rendering process.


## 2025-03-23

- [#244350](https://github.com/microsoft/vscode/pull/244350) Align editing session creation with ChatModel (@roblourens)
  > **AI Summary**: This pull request aligns the creation of editing sessions with the ChatModel. It includes modifications to various files related to chat actions, editing, content parts, widgets, and services. The main impact areas are in improving the consistency and functionality of editing sessions within the chat feature.

- [#244397](https://github.com/microsoft/vscode/pull/244397) accessibility: improve aria-labels for step completion checkboxes (@bhavyaus)
  > **AI Summary**: This pull request improves the aria-labels for step completion checkboxes in the welcomeGettingStarted feature of VS Code. The main change is in the gettingStarted.ts file, with a focus on accessibility enhancements. This will improve the user experience for individuals using screen readers and other assistive technologies.

- [#244396](https://github.com/microsoft/vscode/pull/244396) Fix scrolling after switching modes (@roblourens)
  > **AI Summary**: This Pull Request fixes scrolling issues after switching modes in the chat widget. It ensures that scroll-lock always matches the current mode and sets the last response min height in all modes for a better appearance. The main impact areas are in the chat widget functionality and visual presentation.

- [#244395](https://github.com/microsoft/vscode/pull/244395) Fix double-disposing edit session (@roblourens)
  > **AI Summary**: This Pull Request fixes a double-disposing issue in the edit session and addresses inline chat functionality. Changes are made to multiple files related to chat editing and service implementation. The impact is improved handling of editing sessions and inline chat functionality within the VS Code workspace.

- [#244394](https://github.com/microsoft/vscode/pull/244394) Fix inno updater signing issue (@joaomoreno)
  > **AI Summary**: This pull request fixes an issue with the inno updater signing process. The changes are made to the Cargo.lock, Cargo.toml, and inno_updater.exe files in the win32 build directory. The impact of this fix is to ensure that the inno updater is properly signed, improving the security and reliability of the application.

- [#244393](https://github.com/microsoft/vscode/pull/244393) chat - setup tweaks (@bpasero)
  > **AI Summary**: This Pull Request makes setup tweaks to the chat feature in the VS Code workspace. Changes include modifications to chatActions.ts and chatSetup.ts files. The purpose of the changes is to improve the functionality and user experience of the chat feature. The impact areas include the chat actions and setup within the VS Code workspace.

- [#244391](https://github.com/microsoft/vscode/pull/244391) chat: improve tool selection rememberance (@connor4312)
  > **AI Summary**: This PR improves tool selection rememberance in the chat feature by changing the model to remember unselected tools or tool sources. This ensures that new data sources or new tools added to existing undisabled data sources will be selected. The changes impact multiple files related to chat tools and language model tools services. Overall, this update aims to prevent issues with new tools not being selected and improve the user experience in tool selection.

- [#244354](https://github.com/microsoft/vscode/pull/244354) Go back to original edits mode in unified view with all models (@roblourens)
  > **AI Summary**: This Pull Request focuses on reverting to the original edits mode in the unified view with all models. The main changes include adding a setting `chat.edits2.enabled` to control edits mode, disallowing switching from edits mode to others unless using edits2, and fixing terminology in confirm messages. The impact areas are in the chat functionality of the VS Code workbench, with modifications made to several files related to chat actions and constants.

- [#244352](https://github.com/microsoft/vscode/pull/244352) Render breaks in request messages in the way that users expect (@roblourens)
  > **AI Summary**: This PR aims to improve the rendering of line breaks in request messages to align with user expectations. It also addresses history issues for sessions migrated from the edit view. The changes primarily impact the chatMarkdownContentPart and chatServiceImpl files.

- [#244351](https://github.com/microsoft/vscode/pull/244351) Fix bad chat input layout after adding context that wraps (@roblourens)
  > **AI Summary**: This Pull Request fixes the layout of the chat input after adding context that wraps. The main changes are made in the chatInputPart.ts file, with a modification of +3 and -2 lines. The purpose of this PR is to improve the user experience of the chat input layout in the VS Code workspace. The impact areas include the chat feature within the workspace and potentially other related UI elements.
