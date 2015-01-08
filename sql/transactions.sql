CREATE TABLE "Transactions" (
	"id" INT NOT NULL primary key  identity ,
	"agents_id" INT NULL references agents(id),
	"description" VARCHAR(50) NULL,
	"date" DATETIME NULL
);
