.PHONY: init bootstrap start

init:
	pnpm i

build: init
	pnpm build

bootstrap: build