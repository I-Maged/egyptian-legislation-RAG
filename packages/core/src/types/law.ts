export interface LawDocument {
  id: string;

  law_name: string;
  law_number: string | null;
  year: string | null;

  jurisdiction: "EG";
  language: "ar";

  source_file: string;

  metadata: {
    parser_version: string;
    normalization_version: string;
  };
}

export interface LawChunk {
  id: string;

  document_id: string;

  law_name: string;
  law_number: string | null;
  year: string | null;

  article_number: string;
  article_title: string | null;

  chapter: string | null;
  section: string | null;
  paragraph: string | null;

  text: string;
  text_for_embedding: string;

  provenance: {
    source_file: string;
    page: number | null;
  };

  metadata: {
    parser_version: string;
    normalization_version: string;
    ocr_confidence: number | null;
  };
}
