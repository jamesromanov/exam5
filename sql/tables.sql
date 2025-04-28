CREATE TABLE "users" (
	"id" BIGSERIAL NOT NULL UNIQUE,
	"name" VARCHAR(255),
	"age" INTEGER NOT NULL,
	"email" VARCHAR(255) NOT NULL,
	"password" TEXT NOT NULL,
	"role" VARCHAR(255),
	"isActive" BOOLEAN,
	"createdAt" TIMESTAMP,
	"updatedAt" TIMESTAMP,
	PRIMARY KEY("id")
);
CREATE INDEX "users_index_0"
ON "users" ("name", "email");

CREATE TABLE "blogs" (
	"id" BIGSERIAL NOT NULL UNIQUE,
	"title" VARCHAR(255),
	"content" VARCHAR(255),
	"user_id" BIGINT,
	"image" VARCHAR(255),
	"createdAt" TIMESTAMP DEFAULT current_timestamp,
	"updatedAt" TIMESTAMP,
	"isActive" BOOLEAN DEFAULT true,
	PRIMARY KEY("id")
);
CREATE INDEX "blogs_index_0"
ON "blogs" ("title");

CREATE TABLE "comments" (
	"id" BIGSERIAL NOT NULL UNIQUE,
	"title" VARCHAR(255),
	"user_id" BIGINT NOT NULL,
	"post_id" BIGINT,
	"blog_id" BIGINT,
	"createdAt" TIMESTAMP DEFAULT current_timestamp,
	"updatedAt" TIMESTAMP,
	"isActive" BOOLEAN DEFAULT true,
	PRIMARY KEY("id")
);
CREATE INDEX "comments_index_0"
ON "comments" ("title", "user_id", "post_id", "blog_id", "parent_id");

CREATE TABLE "posts" (
	"id" BIGSERIAL NOT NULL UNIQUE,
	"title" VARCHAR(255) NOT NULL,
	"content" VARCHAR(255),
	"image" VARCHAR(255),
	"user_id" BIGINT,
	"createdAt" TIMESTAMP DEFAULT current_timestamp,
	"updatedAt" TIMESTAMP,
	"isActive" BOOLEAN DEFAULT true,
	"blog_id" BIGINT,
	PRIMARY KEY("id")
);

CREATE TABLE "followers" (
	"id" BIGSERIAL NOT NULL UNIQUE,
	"parent_id" BIGINT,
	"post_id" BIGINT,
	"blog_id" BIGINT,
	"follower_id" BIGINT,
	"createdAt" TIMESTAMP DEFAULT current_timestamp,
	PRIMARY KEY("id")
);
CREATE INDEX "followers_index_0"
ON "followers" ("parent_id", "post_id", "blog_id", "follower_id");

CREATE TABLE "logger" (
	"id" BIGSERIAL NOT NULL UNIQUE,
	"time" VARCHAR(255) DEFAULT current_timestamp,
	"ip" VARCHAR(255),
	"method" VARCHAR(255),
	PRIMARY KEY("id")
);

CREATE TABLE "views" (
	"id" BIGSERIAL NOT NULL UNIQUE,
	"post_id" BIGINT,
	"blog_id" BIGINT,
	"views_count" BIGINT,
	PRIMARY KEY("id")
);
CREATE INDEX "views_index_0"
ON "views" ();

ALTER TABLE "blogs"
ADD FOREIGN KEY("user_id") REFERENCES "users"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "posts"
ADD FOREIGN KEY("user_id") REFERENCES "users"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "comments"
ADD FOREIGN KEY("user_id") REFERENCES "users"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "followers"
ADD FOREIGN KEY("parent_id") REFERENCES "users"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "followers"
ADD FOREIGN KEY("post_id") REFERENCES "posts"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "followers"
ADD FOREIGN KEY("blog_id") REFERENCES "blogs"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "followers"
ADD FOREIGN KEY("follower_id") REFERENCES "users"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "comments"
ADD FOREIGN KEY("post_id") REFERENCES "posts"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "comments"
ADD FOREIGN KEY("blog_id") REFERENCES "blogs"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "posts"
ADD FOREIGN KEY("blog_id") REFERENCES "blogs"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "views"
ADD FOREIGN KEY("blog_id") REFERENCES "blogs"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE "views"
ADD FOREIGN KEY("post_id") REFERENCES "posts"("id")
ON UPDATE NO ACTION ON DELETE NO ACTION;