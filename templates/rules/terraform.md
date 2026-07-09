---
title: Terraform
category: Infra
scope: glob
globs: ["**/*.tf"]
---

- Keep state remote and locked; never commit state files or secrets.
- Modularize reusable infra; pin provider and module versions.
- Always `plan` before `apply`; review the diff; use workspaces/dirs per environment.
- Pass secrets via variables/secret stores, not literals; mark sensitive outputs.
- Run `fmt`/`validate` and a policy/lint check (tflint) in CI.
