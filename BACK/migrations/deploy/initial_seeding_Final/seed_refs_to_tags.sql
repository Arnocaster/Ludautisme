BEGIN;

INSERT INTO "reference_to_tag" ("id_ref", "id_tag") VALUES
    (1,1),
    (1,2),
    (1,3),
    (1,4),
    (2,3),
    (2,4),
    (3,1);
COMMIT;
