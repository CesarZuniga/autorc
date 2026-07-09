---
title: Go
category: Language
scope: glob
globs: ["**/*.go"]
---

- Handle every error explicitly; wrap with `fmt.Errorf("...: %w", err)` for context.
- Keep interfaces small and defined at the consumer, not the producer.
- Accept `context.Context` as the first arg for I/O; honor cancellation and deadlines.
- Run `gofmt`/`goimports` and `go vet`; treat `golangci-lint` findings as signal.
- Prefer composition over inheritance; return concrete types, accept interfaces.
- Guard goroutines against leaks; use channels/`sync` carefully and always close what you own.
- Keep zero values useful; avoid unnecessary pointers.
