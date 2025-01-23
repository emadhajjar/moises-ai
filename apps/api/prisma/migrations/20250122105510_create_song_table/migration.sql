-- CreateTable
CREATE TABLE "Song" (
  "id" BIGSERIAL NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,
  "title" TEXT NOT NULL,
  "artist" TEXT NOT NULL,
  "albumTitle" TEXT NOT NULL,
  "albumYear" INTEGER NOT NULL,
  "audio" TEXT NOT NULL,
  "cover" TEXT NOT NULL,
  "poster" TEXT NOT NULL,
  CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_RelatedSongs" (
  "A" BIGINT NOT NULL,
  "B" BIGINT NOT NULL,
  CONSTRAINT "_RelatedSongs_AB_pkey" PRIMARY KEY ("A", "B")
);

-- CreateIndex
CREATE INDEX "_RelatedSongs_B_index" ON "_RelatedSongs" ("B");

-- AddForeignKey
ALTER TABLE "_RelatedSongs"
ADD CONSTRAINT "_RelatedSongs_A_fkey" FOREIGN KEY ("A") REFERENCES "Song" ("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_RelatedSongs"
ADD CONSTRAINT "_RelatedSongs_B_fkey" FOREIGN KEY ("B") REFERENCES "Song" ("id") ON DELETE CASCADE ON UPDATE CASCADE;
