# Egyptian Law Parser V2.3

V2.3 makes article-sequence gaps a first-class OCR-recovery signal.

Run the first pass without a recovery file:

```bash
npm install
npm run build
node dist/index.js input/labour_law_qwen_output.json output/labour_law_v2_3.json input/labour_law.pdf
```

For the Labour Law case discussed in this project, the expected recovery queue is:

- PDF page 53: Articles 121, 122
- PDF page 76: Articles 187, 188, 189

Pages 1–10 and page 112 should not become recovery tasks merely because Qwen returned no records.

After a separate OCR recovery pass creates `labour_law_recovered_pages.json`, run:

```bash
node dist/index.js input/labour_law_qwen_output.json output/labour_law_v2_3_final.json input/labour_law.pdf input/labour_law_recovered_pages.json
```

V2.3 does not invent legal text, translate, embed, or split articles by character count.
