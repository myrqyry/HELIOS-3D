# Tool Configurations & Gotchas: HELIOS-3D

## Primary Tools

| Tool | Usage | Gotchas |
| :--- | :--- | :--- |
| `notebooklm` | Deep literature queries | Limited to 50/day. Fresh session each time. |
| `run_shell_command` | Simulations, git, file ops | Always use non-interactive flags. Explain before modifying. |
| `web_fetch` | Paper metadata extraction | Requires valid URLs. Use for raw code/text only. |
| `grep_search` | Codebase mapping | Use `include_pattern` to narrow scope. |

## Specialized Skills

- `proactive-agent`: Maintains state and anticipates needs.
- `gemini-interactions-api`: For complex generation tasks (e.g. repo reviews).
- `vitest` / `pytest`: For validating analysis and simulation scripts.

## Learned Gotchas
- **DISH paper:** Very large (57MB). Use `pdftotext` for targeted extraction instead of `read_file`.
- **MuMax3 configs:** `.mx3` files are plain text but require a specific syntax. Always validate against `simulations/AGENTS.md`.
- **Markdown:** Use MathJax for equations in `docs/`.
