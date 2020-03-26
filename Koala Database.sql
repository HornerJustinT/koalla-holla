CREATE TABLE "koala" (
"id" serial primary key,
"name" varchar(80) NOT NULL,
"gender" varchar(1) NOT NULL,
-- lets make another colum name type other parameter
"age" INTEGER NOT NULL,
"ready_to_transfer" varchar(1) NOT NULL,
"notes" varchar(240));