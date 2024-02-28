export async function* readAllChunks(
  stream: ReadableStream<Uint8Array>,
): AsyncGenerator<string, void, undefined> {
  const reader = stream.getReader();
  let done = false;
  let value: Uint8Array | undefined;
  while (!done) {
    ({ done, value } = await reader.read());
    if (value) {
      yield new TextDecoder().decode(value);
    }
  }
  reader.releaseLock();
}
