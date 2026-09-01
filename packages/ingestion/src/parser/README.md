# Parser V3.1

Parser V3.1 is **Qwen-first with PDF structural validation**.

## Design rules

1. The original Qwen OCR record stream is the authoritative text input.
2. The PDF is used for page count, structural validation, article-marker coverage, and optional PDF-only recovery.
3. Personal Affairs is treated as a compilation of separate legal instruments; article number alone is never used as a global key.
4. Qwen records are kept in source order. Only contiguous records belonging to the same instrument and article are merged.
5. Missing article numbers are reported; the parser does not fabricate legal text.
6. Recovery OCR can be supplied explicitly and is inserted into the source stream by PDF page position.
7. A Parser V2/V2.3 output is never treated as original Qwen records. However, V3.1 may **safely adapt** a legacy artifact for a single-instrument profile when it proves that article boundaries are already one-to-one, article numbers are unique and ordered, and page metadata is valid. This is useful for existing Labour/Financial V2.3 artifacts while still protecting Personal Affairs from the old global merge.

## Preferred commands

Labour Law, using the original Qwen file:

```bash
npm run parse:law -- --profile labour \
  --pdf ./data/pdf/labour-src.pdf \
  --qwen ./path/to/labour_law_qwen_output.json \
  --output ./output/labour-v3.json
```

Labour Law with the existing recovery OCR report:

```bash
npm run parse:law -- --profile labour \
  --pdf ./data/pdf/labour-src.pdf \
  --qwen ./path/to/labour_law_qwen_output.json \
  --recovery ./path/to/labour_law_recovered_pages.report.json \
  --output ./output/labour-v3.json
```

Financial Law:

```bash
npm run parse:law -- --profile financial \
  --pdf <financial-pdf> \
  --qwen <financial_qwen_output.json> \
  --output ./output/financial-v3.json
```

Personal Affairs compilation:

```bash
npm run parse:law -- --profile personal \
  --pdf <personal-pdf> \
  --qwen <personal_affair_law_qwen_output.json> \
  --output ./output/personal-bundle-v3.json \
  --split-output-dir ./output/personal-v3
```

## V2/V2.3 compatibility

For example, this is **wrong** as `--qwen`:

```bash
--qwen ./data/raw/labour-v2.3.json
```

That file contains Parser V2.3 article objects (`articleNumber`, `pageStart`, `sourceRecordIds`). It is not the original Qwen record array (`article_number`, `page_number`, `text`). V3.1 detects this automatically.

For a **single-instrument** legacy file such as the current Financial V2.3 output, V3.1 performs a safety check and can adapt it without attempting to reconstruct boundaries. The authoritative profile then replaces stale law metadata. The output is labeled `legacy-adapted` and receives a warning.

For a legacy file with repeated article numbers/merged boundaries, such as the old Personal Affairs V2.3 artifact, automatic adaptation is rejected. Use the original Qwen input instead. `--legacy-raw` remains available for explicit diagnostic-only inspection.

## PDF-only mode

PDF-only mode remains available for structural inspection/recovery:

```bash
npm run parse:law -- --profile labour --pdf <pdf> --output <raw-json>
```

PDF-only articles are marked `pdf_text_recovery` and `needsReview=true`; do not index them without checking OCR fidelity.
