-- Rename pgEnum MappingPlatform → ChannelPlatform
-- (Applied directly on staging via psql)

ALTER TYPE "MappingPlatform" RENAME TO "ChannelPlatform";
