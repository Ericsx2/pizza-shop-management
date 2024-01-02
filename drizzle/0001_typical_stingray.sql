CREATE TABLE IF NOT EXISTS "products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"is_available" boolean DEFAULT true,
	"price" real NOT NULL,
	"image_url" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
