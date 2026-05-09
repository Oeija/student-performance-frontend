import * as v from "valibot";

export const predictionSchema = v.object({
  gender: v.pipe(
    v.string("Gender is required"),
    v.nonEmpty("Please select a gender"),
    v.picklist(["male", "female"], "Please select a valid gender")
  ),
  race_ethnicity: v.pipe(
    v.string("Race or ethnicity is required"),
    v.nonEmpty("Please select an ethnicity"),
    v.picklist(
      ["group A", "group B", "group C", "group D", "group E"],
      "Please select a valid ethnicity"
    )
  ),
  parental_level_of_education: v.pipe(
    v.string("Parental education is required"),
    v.nonEmpty("Please select an education level"),
    v.picklist(
      [
        "some high school",
        "high school",
        "some college",
        "associate's degree",
        "bachelor's degree",
        "master's degree",
      ],
      "Please select a valid education level"
    )
  ),
  lunch: v.pipe(
    v.string("Lunch type is required"),
    v.nonEmpty("Please select a lunch type"),
    v.picklist(["free/reduced", "standard"], "Please select a valid lunch type")
  ),
  test_preparation_course: v.pipe(
    v.string("Test preparation is required"),
    v.nonEmpty("Please select a test preparation option"),
    v.picklist(["none", "completed"], "Please select a valid test preparation option")
  ),
  reading_score: v.pipe(
    v.number("Reading score is required"),
    v.minValue(0, "Reading score must be at least 0"),
    v.maxValue(100, "Reading score must be at most 100")
  ),
  writing_score: v.pipe(
    v.number("Writing score is required"),
    v.minValue(0, "Writing score must be at least 0"),
    v.maxValue(100, "Writing score must be at most 100")
  ),
});

export type PredictionSchema = v.InferOutput<typeof predictionSchema>;
