enum UserRole {
USER
ADMIN
}

model User {
id String @id @default(cuid())

email String @unique
passwordHash String

name String?

role UserRole @default(USER)

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt
lastLoginAt DateTime?

conversations Conversation[]
feedbacks Feedback[]
suggestions LawSuggestion[]
auditLogs AuditLog[]
}

model Conversation {
id String @id @default(cuid())
userId String

title String?

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

user User @relation(fields: [userId], references: [id], onDelete: Cascade)
messages Message[]

@@index([userId])
}

enum MessageRole {
USER
ASSISTANT
}

model Message {
id String @id @default(cuid())
conversationId String

role MessageRole
content String

createdAt DateTime @default(now())

conversation Conversation @relation(
fields: [conversationId],
references: [id],
onDelete: Cascade
)

ragRun RagRun?
feedback Feedback?

@@index([conversationId])
}

model RagRun {
id String @id @default(cuid())
messageId String @unique

model String
retrievalTimeMs Int?
generationTimeMs Int?
totalTimeMs Int?

createdAt DateTime @default(now())

message Message @relation(
fields: [messageId],
references: [id],
onDelete: Cascade
)

citations RagCitation[]
}

model RagCitation {
id String @id @default(cuid())

ragRunId String
chunkId String

rank Int?
score Float?

ragRun RagRun @relation(fields: [ragRunId], references: [id], onDelete: Cascade)
chunk LawChunk @relation(fields: [chunkId], references: [id])

@@index([ragRunId])
@@index([chunkId])
}

enum FeedbackType {
POSITIVE
NEGATIVE
}

model Feedback {
id String @id @default(cuid())
userId String
messageId String @unique

type FeedbackType
comment String?

createdAt DateTime @default(now())

user User @relation(fields: [userId], references: [id], onDelete: Cascade)
message Message @relation(fields: [messageId], references: [id], onDelete: Cascade)

@@index([userId])
}

enum SuggestionType {
ADD_LAW
EDIT_LAW
EDIT_ARTICLE
}

enum SuggestionStatus {
PENDING
UNDER_REVIEW
APPROVED
REJECTED
}

model LawSuggestion {
id String @id @default(cuid())

userId String

type SuggestionType
status SuggestionStatus @default(PENDING)

lawDocumentId String?
lawChunkId String?

title String
reason String
proposedText String?

adminNote String?

reviewedBy String?
reviewedAt DateTime?

createdAt DateTime @default(now())
updatedAt DateTime @updatedAt

user User @relation(fields: [userId], references: [id], onDelete: Cascade)

@@index([userId])
@@index([status])
@@index([lawDocumentId])
@@index([lawChunkId])
}

enum AuditAction {
CREATE_LAW
UPDATE_LAW
DELETE_LAW
CREATE_ARTICLE
UPDATE_ARTICLE
DELETE_ARTICLE

APPROVE_SUGGESTION
REJECT_SUGGESTION
}

model AuditLog {
id String @id @default(cuid())

userId String
action AuditAction

entityType String
entityId String

before Json?
after Json?

createdAt DateTime @default(now())

user User @relation(fields: [userId], references: [id])

@@index([userId])
@@index([entityType, entityId])
@@index([createdAt])
}
