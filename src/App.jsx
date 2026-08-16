import { useState } from "react";
import "./App.css";
function App() {
  // ============================================================
  // GPA STATE
  // ============================================================
  const [gpa, setGpa] = useState("");
  const [gpaScale, setGpaScale] = useState("");
  const [customGpaScale, setCustomGpaScale] = useState("");
  const [gpaGoal, setGpaGoal] = useState("");
  const [gpaResult, setGpaResult] = useState(null);
  // ============================================================
  // ACT STATE
  // ============================================================
  const [act, setAct] = useState("");
  const [actGoal, setActGoal] = useState("");
  const [actResult, setActResult] = useState(null);
  // ============================================================
  // APPLICATION STATE
  // ============================================================
  const [college, setCollege] = useState("");
  const [major, setMajor] = useState("");
  const [applicationType, setApplicationType] = useState("");
  const [applicationStatus, setApplicationStatus] = useState("");
  const [deadline, setDeadline] = useState("");
  // ============================================================
  // APPLICATION TRACKER STATE
  // ============================================================
  const [applications, setApplications] = useState([]);
  const [trackerError, setTrackerError] = useState("");
  // ============================================================
  // GENERAL STATE
  // ============================================================
  const [deadlineResult, setDeadlineResult] = useState(null);
  // ============================================================
  // SUPPORTED APPLICATION TYPES
  // ============================================================
  const applicationTypes = [
    {
      value: "RD",
      label: "Regular Decision",
    },
    {
      value: "EA",
      label: "Early Action",
    },
    {
      value: "EDI",
      label: "Early Decision I",
    },
    {
      value: "EDII",
      label: "Early Decision II",
    },
    {
      value: "REA",
      label: "Restrictive Early Action",
    },
    {
      value: "SCEA",
      label: "Single-Choice Early Action",
    },
    {
      value: "ROLLING",
      label: "Rolling Admission",
    },
  ];
  // ============================================================
  // SUPPORTED APPLICATION STATUSES
  // ============================================================
  const applicationStatuses = [
    {
      value: "NOTSTARTED",
      label: "Not Started",
    },
    {
      value: "INPROGRESS",
      label: "In Progress",
    },
    {
      value: "SUBMITTED",
      label: "Submitted",
    },
    {
      value: "ACCEPTED",
      label: "Accepted",
    },
    {
      value: "WAITLISTED",
      label: "Waitlisted",
    },
    {
      value: "REJECTED",
      label: "Rejected",
    },
    {
      value: "DEFERRED",
      label: "Deferred",
    },
    {
      value: "WITHDRAWN",
      label: "Withdrawn",
    },
  ];
  // ============================================================
  // GPA INPUT HANDLERS
  // ============================================================
  const handleGpaChange = (e) => {
    setGpa(e.target.value);
    setGpaResult(null);
  };
  const handleGpaScaleChange = (e) => {
    setGpaScale(e.target.value);
    setGpaResult(null);
  };
  const handleCustomGpaScaleChange = (e) => {
    setCustomGpaScale(e.target.value);
    setGpaResult(null);
  };
  const handleGpaGoalChange = (e) => {
    setGpaGoal(e.target.value);
    setGpaResult(null);
  };
  // ============================================================
  // ACT INPUT HANDLERS
  // ============================================================
  const handleActChange = (e) => {
    setAct(e.target.value);
    setActResult(null);
  };
  const handleActGoalChange = (e) => {
    setActGoal(e.target.value);
    setActResult(null);
  };
  // ============================================================
  // APPLICATION INPUT HANDLERS
  // ============================================================
  const handleCollegeChange = (e) => {
    setCollege(e.target.value);
    setTrackerError("");
  };
  const handleMajorChange = (e) => {
    setMajor(e.target.value);
    setTrackerError("");
  };
  const handleApplicationTypeChange = (e) => {
    setApplicationType(e.target.value);
    setTrackerError("");
  };
  const handleApplicationStatusChange = (e) => {
    setApplicationStatus(e.target.value);
    setTrackerError("");
  };
  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
    setDeadlineResult(null);
    setTrackerError("");
  };


  // ============================================================
  // GPA VALIDATION
  // ============================================================
  const validateGPA = () => {
    const gpaValue = Number(gpa);
    const scaleValue =
      gpaScale === "custom"
        ? Number(customGpaScale)
        : Number(gpaScale);
    // ------------------------------------------------------------
    // GPA WAS NOT PROVIDED
    // ------------------------------------------------------------
    if (gpa === "") {
      setGpaResult({
        valid: false,
        type: "notProvided",
        message: "GPA: Not provided",
        error: "Please enter a GPA.",
      });
      return;
    }
    // ------------------------------------------------------------
    // GPA IS NOT A VALID NUMBER
    // ------------------------------------------------------------
    if (isNaN(gpaValue)) {
      setGpaResult({
        valid: false,
        type: "invalidGPA",
        message: "GPA: Not provided",
        error: "Please enter a valid GPA.",
      });
      return;
    }
    // ------------------------------------------------------------
    // GPA SCALE WAS NOT PROVIDED
    // ------------------------------------------------------------
    if (
      gpaScale === "" ||
      gpaScale === null ||
      gpaScale === undefined ||
      (
        gpaScale === "custom" &&
        (
          customGpaScale === "" ||
          customGpaScale === null ||
          customGpaScale === undefined
        )
      )
    ) {
      setGpaResult({
        valid: false,
        type: "noScale",
        message: `GPA: ${gpaValue}`,
        error: "Please select a GPA scale.",
      });
      return;
    }
    // ------------------------------------------------------------
    // GPA SCALE IS NOT A VALID NUMBER
    // ------------------------------------------------------------
    if (isNaN(scaleValue) || scaleValue <= 0) {
      setGpaResult({
        valid: false,
        type: "invalidScale",
        message: `GPA: ${gpaValue}`,
        error: "Please enter a valid GPA scale.",
      });
      return;
    }
    // ------------------------------------------------------------
    // GPA CANNOT BE NEGATIVE
    // ------------------------------------------------------------
    if (gpaValue < 0) {
      setGpaResult({
        valid: false,
        type: "negative",
        message: `GPA: ${gpaValue}`,
        error: "GPA cannot be negative.",
      });
      return;
    }
    // ------------------------------------------------------------
    // GPA CANNOT BE HIGHER THAN SCALE
    // ------------------------------------------------------------
    if (gpaValue > scaleValue) {
      setGpaResult({
        valid: false,
        type: "tooHigh",
        message: `GPA: ${gpaValue}`,
        error: "GPA cannot be higher than the GPA scale.",
      });
      return;
    }
    // ------------------------------------------------------------
    // NORMALIZED GPA
    // ------------------------------------------------------------
    const gpaPercent =
      (gpaValue / scaleValue) * 100;
    // ------------------------------------------------------------
    // GPA SCALE NAME
    // ------------------------------------------------------------
    let scaleName = "";
    let customMessage = "";
    if (scaleValue === 4.0) {
      scaleName = "Unweighted (4.0)";
    }
    else if (scaleValue === 4.3) {
      scaleName = "Unweighted (4.3)";
    }
    else if (scaleValue === 5.0) {
      scaleName = "Weighted (5.0)";
    }
    else if (scaleValue === 5.3) {
      scaleName = "Weighted (5.3)";
    }
    else {
      scaleName =
        `Custom GPA Scale (${scaleValue})`;
      customMessage =
        "Custom GPA scales are supported for GPA normalization only.";
    }
    // ------------------------------------------------------------
    // GPA GOAL VALIDATION
    // ------------------------------------------------------------
    let gpaGoalResult = null;
    if (gpaGoal !== "") {
      const gpaGoalValue = Number(gpaGoal);
      if (isNaN(gpaGoalValue)) {
        gpaGoalResult = {
          valid: false,
          error: "Please enter a valid GPA goal.",
        };
      }
      else if (gpaGoalValue < 0) {
        gpaGoalResult = {
          valid: false,
          error: "GPA Goal cannot be negative.",
        };
      }
      else if (gpaGoalValue > scaleValue) {
        gpaGoalResult = {
          valid: false,
          error:
            "GPA Goal cannot be higher than the GPA scale.",
        };
      }
      else {
        const gpaDifference =
          gpaGoalValue - gpaValue;
        if (gpaValue >= gpaGoalValue) {
          gpaGoalResult = {
            valid: true,
            goal: gpaGoalValue,
            achieved: true,
          };
        }
        else {
          gpaGoalResult = {
            valid: true,
            goal: gpaGoalValue,
            achieved: false,
            difference: Number(
              gpaDifference.toFixed(4)
            ),
          };
        }
      }
    }
    // ------------------------------------------------------------
    // SAVE COMPLETE GPA RESULT
    // ------------------------------------------------------------
    setGpaResult({
      valid: true,
      gpa: gpaValue,
      scale: scaleValue,
      normalizedGPA:
        gpaPercent.toFixed(1),
      scaleName: scaleName,
      customMessage: customMessage,
      goal: gpaGoalResult,
      note: [
        "GPA standards vary between schools.",
        "This normalized GPA is for reference only.",
        "It is NOT an indicator of admission competitiveness.",
      ],
    });
  };



  // ============================================================

// ACT NATIONAL RANKS

// ============================================================

// Official ACT National Ranks

//

// Applicable to ACT tests taken:

// September 2025 through August 2026

//

// Based on ACT-tested high school graduates

// from the classes of 2023, 2024, and 2025.

//

// IMPORTANT:

// These values are Composite ACT national ranks.

// ============================================================

const actNationalRanks = {

  36: 100,

  35: 99,

  34: 99,

  33: 98,

  32: 97,

  31: 96,

  30: 94,

  29: 92,

  28: 91,

  27: 88,

  26: 86,

  25: 83,

  24: 80,

  23: 76,

  22: 72,

  21: 68,

  20: 63,

  19: 57,

  18: 52,

  17: 46,

  16: 40,

  15: 34,

  14: 27,

  13: 20,

  12: 12,

  11: 5,

  10: 2,

  9: 1,

  8: 1,

  7: 1,

  6: 1,

  5: 1,

  4: 1,

  3: 1,

  2: 1,

  1: 1,

};

// ============================================================

// ACT NATIONAL RANK ORDINAL

// ============================================================

// Example:

// 96 -> 96th

// 91 -> 91st

// 82 -> 82nd

// 83 -> 83rd

// ============================================================

const getOrdinal = (number) => {

  if (

    number % 100 >= 11 &&

    number % 100 <= 13

  ) {

    return `${number}th`;

  }

  switch (number % 10) {

    case 1:

      return `${number}st`;

    case 2:

      return `${number}nd`;

    case 3:

      return `${number}rd`;

    default:

      return `${number}th`;

  }

};

// ============================================================

// ACT NATIONAL AVERAGE

// ============================================================

// Official Composite mean for this National Rank table:

// 19.2

// ============================================================

const actNationalAverage = 19.2;

// ============================================================

// ACT VALIDATION

// ============================================================

const validateACT = () => {

  const actValue = Number(act);

  const actGoalValue = Number(actGoal);

  // ============================================================

  // ACT NATIONAL RANKS

  // Official ACT Composite national ranks

  // Used for tests taken from September 2025 through August 2026

  // ============================================================

  const actNationalRanks = {

    36: 100,

    35: 99,

    34: 99,

    33: 98,

    32: 97,

    31: 96,

    30: 94,

    29: 92,

    28: 91,

    27: 88,

    26: 86,

    25: 83,

    24: 80,

    23: 76,

    22: 72,

    21: 68,

    20: 63,

    19: 57,

    18: 52,

    17: 46,

    16: 40,

    15: 34,

    14: 27,

    13: 20,

    12: 12,

    11: 5,

    10: 2,

    9: 1,

    8: 1,

    7: 1,

    6: 1,

    5: 1,

    4: 1,

    3: 1,

    2: 1,

    1: 1,

  };

  // ============================================================

  // ACT NATIONAL AVERAGE

  // ============================================================

  const actNationalAverage = 19.2;

  // ============================================================

  // ACT WAS NOT PROVIDED

  // ============================================================

  if (act === "") {

    setActResult({

      valid: false,

      type: "notProvided",

      message: "ACT: Not provided",

      error: "Please enter an ACT score.",

    });

    return;

  }

  // ============================================================

  // ACT IS NOT A VALID NUMBER

  // ============================================================

  if (isNaN(actValue)) {

    setActResult({

      valid: false,

      type: "invalidACT",

      message: "ACT: Not provided",

      error: "Please enter a valid ACT score.",

    });

    return;

  }

  // ============================================================

  // ACT MUST BE A WHOLE NUMBER

  // ============================================================

  if (!Number.isInteger(actValue)) {

    setActResult({

      valid: false,

      type: "notInteger",

      message: `ACT: ${actValue}`,

      error:

        "ACT scores must be whole numbers from 1 to 36.",

    });

    return;

  }

  // ============================================================

  // ACT MUST BE BETWEEN 1 AND 36

  // ============================================================

  if (

    actValue < 1 ||

    actValue > 36

  ) {

    setActResult({

      valid: false,

      type: "outOfRange",

      message: `ACT: ${actValue}`,

      error:

        "ACT scores must be between 1 and 36.",

    });

    return;

  }

  // ============================================================

  // ACT SCORE CATEGORY

  // ============================================================

  let category = "";

  if (actValue >= 35) {

    category = "Outstanding ACT score";

  }

  else if (actValue >= 32) {

    category = "Excellent ACT score";

  }

  else if (actValue >= 29) {

    category = "Very strong ACT score";

  }

  else if (actValue >= 25) {

    category = "Strong ACT score";

  }

  else if (actValue >= 21) {

    category = "Good ACT score";

  }

  else if (actValue >= 17) {

    category = "Average ACT score";

  }

  else if (actValue >= 13) {

    category = "Below average ACT score";

  }

  else {

    category = "Need Improvement";

  }

  // ============================================================

  // NATIONAL RANK

  // ============================================================

  const nationalRank =

    actNationalRanks[actValue];

  // ============================================================

  // SCORE LEVEL

  // ============================================================

  let scoreLevel = "";

  if (actValue >= 34) {

    scoreLevel = "Top-tier ACT score";

  }

  else if (actValue >= 31) {

    scoreLevel = "Excellent ACT score";

  }

  else if (actValue >= 28) {

    scoreLevel = "Very strong ACT score";

  }

  else if (actValue >= 25) {

    scoreLevel = "Strong ACT score";

  }

  else if (actValue >= 21) {

    scoreLevel = "Solid ACT score";

  }

  else if (actValue >= 17) {

    scoreLevel =

      "Around the national average range";

  }

  else if (actValue >= 13) {

    scoreLevel =

      "Below the national average range";

  }

  else {

    scoreLevel =

      "Well below the national average range";

  }

  // ============================================================

  // COLLEGE READINESS

  // ============================================================

  let readinessLevel = "";

  if (actValue >= 26) {

    readinessLevel =

      "Strong general college-readiness indicator";

  }

  else if (actValue >= 22) {

    readinessLevel =

      "Generally competitive for college-level preparation";

  }

  else if (actValue >= 18) {

    readinessLevel =

      "Mixed readiness indicator";

  }

  else {

    readinessLevel =

      "Additional preparation may be helpful";

  }

  // ============================================================

  // ACT GOAL VALIDATION

  // ============================================================

  let goalResult = null;

  if (actGoal !== "") {

    if (isNaN(actGoalValue)) {

      goalResult = {

        valid: false,

        error:

          "Please enter a valid ACT goal.",

      };

    }

    else if (

      !Number.isInteger(actGoalValue)

    ) {

      goalResult = {

        valid: false,

        error:

          "ACT Goal must be a whole number.",

      };

    }

    else if (

      actGoalValue < 1 ||

      actGoalValue > 36

    ) {

      goalResult = {

        valid: false,

        error:

          "ACT Goal must be between 1 and 36.",

      };

    }

    else {

      const actDifference =

        actGoalValue - actValue;

      if (actValue >= actGoalValue) {

  goalResult = {

    valid: true,

    goal: actGoalValue,

    achieved: true,

    difference: actValue - actGoalValue,

  };

} else {

  goalResult = {

    valid: true,

    goal: actGoalValue,

    achieved: false,

    difference: actGoalValue - actValue,

  };

}

    }

  }

  // ============================================================

  // ACT GOAL PROGRESS

  // ============================================================

  let goalProgress = null;

  if (

    actGoal !== "" &&

    !isNaN(actGoalValue) &&

    Number.isInteger(actGoalValue) &&

    actGoalValue >= 1 &&

    actGoalValue <= 36

  ) {

    goalProgress =

      Math.min(

        (actValue / actGoalValue) * 100,

        100

      );

  }

  // ============================================================

  // NATIONAL AVERAGE COMPARISON

  // ============================================================

  const differenceFromAverage =

    Number(

      (

        actValue -

        actNationalAverage

      ).toFixed(1)

    );

  // ============================================================

  // SAVE ACT RESULT

  // ============================================================

  setActResult({

    valid: true,

    // Basic ACT information

    act: actValue,

    category: category,

    // ACT Score Profile

    nationalRank: nationalRank,

    scoreLevel: scoreLevel,

    readinessLevel: readinessLevel,

    nationalAverage: actNationalAverage,

    differenceFromAverage:

      differenceFromAverage,

    goalProgress: goalProgress,

    // ACT Goal

    goal: goalResult,

    // Notes

    note: [

      "National percentile ranks are based on ACT national rank data for tests taken from September 2025 through August 2026.",

      "ACT national ranks show the percentage of recent ACT-tested graduates who scored at or below a given score.",

      "College Readiness Benchmarks are based on individual ACT section scores, not the Composite score alone.",

      "An ACT score alone does not indicate college admission chances.",

    ],

  });

};





// ============================================================
// DEADLINE VALIDATION
// ============================================================
const validateDeadlineValue = (deadlineValue) => {
  // ------------------------------------------------------------
  // DEADLINE WAS NOT PROVIDED
  // ------------------------------------------------------------
  if (
    !deadlineValue ||
    !deadlineValue.trim()
  ) {
    return {
      valid: false,
      type: "notProvided",
      error:
        "Please enter an application deadline.",
    };
  }
  const input = deadlineValue.trim();
  // ------------------------------------------------------------
  // PARSED DATE VALUES
  // ------------------------------------------------------------
  let year;
  let month;
  let day;
  // ------------------------------------------------------------
  // FORMAT 1: YYYY-MM-DD
  // Example: 2026-11-01
  // ------------------------------------------------------------
  let match = input.match(
    /^(\d{4})-(\d{1,2})-(\d{1,2})$/
  );
  if (match) {
    year = Number(match[1]);
    month = Number(match[2]);
    day = Number(match[3]);
  }
  // ------------------------------------------------------------
  // FORMAT 2: YYYY/MM/DD
  // Example: 2026/11/01
  // ------------------------------------------------------------
  if (!match) {
    match = input.match(
      /^(\d{4})\/(\d{1,2})\/(\d{1,2})$/
    );
    if (match) {
      year = Number(match[1]);
      month = Number(match[2]);
      day = Number(match[3]);
    }
  }
  // ------------------------------------------------------------
  // FORMAT 3: MM/DD/YYYY
  // Example: 11/01/2026
  // ------------------------------------------------------------
  if (!match) {
    match = input.match(
      /^(\d{1,2})\/(\d{1,2})\/(\d{4})$/
    );
    if (match) {
      month = Number(match[1]);
      day = Number(match[2]);
      year = Number(match[3]);
    }
  }
  // ------------------------------------------------------------
  // FORMAT 4: MM-DD-YYYY
  // Example: 11-01-2026
  // ------------------------------------------------------------
  if (!match) {
    match = input.match(
      /^(\d{1,2})-(\d{1,2})-(\d{4})$/
    );
    if (match) {
      month = Number(match[1]);
      day = Number(match[2]);
      year = Number(match[3]);
    }
  }
  // ------------------------------------------------------------
  // FORMAT 5: MONTH DAY, YEAR
  // Example: November 1, 2026
  // Example: Nov 1, 2026
  // ------------------------------------------------------------
  if (!match) {
    const parsedByName = new Date(input);
    if (!isNaN(parsedByName.getTime())) {
      year = parsedByName.getFullYear();
      month = parsedByName.getMonth() + 1;
      day = parsedByName.getDate();
    }
  }
  // ------------------------------------------------------------
  // COULD NOT UNDERSTAND THE INPUT
  // ------------------------------------------------------------
  if (
    year === undefined ||
    month === undefined ||
    day === undefined
  ) {
    return {
      valid: false,
      type: "invalidFormat",
      error:
        "Please enter a recognizable application deadline.",
      example:
        "Examples: 2026-11-01, 11/01/2026, or November 1, 2026",
    };
  }
  // ------------------------------------------------------------
  // CHECK NUMBERS
  // ------------------------------------------------------------
  if (
    !Number.isInteger(year) ||
    !Number.isInteger(month) ||
    !Number.isInteger(day)
  ) {
    return {
      valid: false,
      type: "invalidDate",
      error:
        "Please enter a valid application deadline.",
      example:
        "Examples: 2026-11-01, 11/01/2026, or November 1, 2026",
    };
  }
  // ------------------------------------------------------------
  // REALISTIC YEAR
  // ------------------------------------------------------------
  const currentYear =
    new Date().getFullYear();
  if (
    year < currentYear - 10 ||
    year > currentYear + 20
  ) {
    return {
      valid: false,
      type: "unrealisticYear",
      error:
        "Please enter a realistic application year.",
    };
  }
  // ------------------------------------------------------------
  // CREATE DATE
  // ------------------------------------------------------------
  const deadlineDate =
    new Date(
      year,
      month - 1,
      day
    );
  deadlineDate.setHours(
    0,
    0,
    0,
    0
  );
  // ------------------------------------------------------------
  // REAL DATE CHECK
  //
  // Prevents dates such as:
  // February 30
  // April 31
  // June 31
  // etc.
  // ------------------------------------------------------------
  if (
    deadlineDate.getFullYear() !== year ||
    deadlineDate.getMonth() !== month - 1 ||
    deadlineDate.getDate() !== day
  ) {
    return {
      valid: false,
      type: "invalidDate",
      error:
        "Please enter a real calendar date.",
      example:
        "Example: November 1, 2026",
    };
  }
  // ------------------------------------------------------------
  // CALCULATE DAYS LEFT
  // ------------------------------------------------------------
  const today =
    new Date();
  today.setHours(
    0,
    0,
    0,
    0
  );
  deadlineDate.setHours(
    0,
    0,
    0,
    0
  );
  const difference =
    deadlineDate - today;
  const daysLeft =
    Math.ceil(
      difference /
      (1000 * 60 * 60 * 24)
    );
  // ------------------------------------------------------------
  // RETURN FUTURE
  // ------------------------------------------------------------
  if (daysLeft > 0) {
    return {
      valid: true,
      type: "future",
      deadline: input,
      parsedYear: year,
      parsedMonth: month,
      parsedDay: day,
      daysLeft: daysLeft,
      message:
        `${daysLeft} day(s) remaining.`,
    };
  }
  // ------------------------------------------------------------
  // RETURN TODAY
  // ------------------------------------------------------------
  if (daysLeft === 0) {
    return {
      valid: true,
      type: "today",
      deadline: input,
      parsedYear: year,
      parsedMonth: month,
      parsedDay: day,
      daysLeft: 0,
      message:
        "Today is the deadline!",
    };
  }
  // ------------------------------------------------------------
  // RETURN PASSED
  // ------------------------------------------------------------
  return {
    valid: true,
    type: "passed",
    deadline: input,
    parsedYear: year,
    parsedMonth: month,
    parsedDay: day,
    daysLeft: Math.abs(daysLeft),
    message:
      `Deadline passed ${Math.abs(daysLeft)} day(s) ago.`,
  };
};
// ============================================================
// CHECK CURRENT DEADLINE
// ============================================================
const validateDeadline = () => {
  const result =
    validateDeadlineValue(
      deadline
    );
  setDeadlineResult(result);
};
// ============================================================
// GET APPLICATION TYPE LABEL
// ============================================================
const getApplicationTypeLabel = (
  value
) => {
  const item =
    applicationTypes.find(
      (type) =>
        type.value === value
    );
  return item
    ? item.label
    : value;
};
// ============================================================
// GET APPLICATION STATUS LABEL
// ============================================================
const getApplicationStatusLabel = (
  value
) => {
  const item =
    applicationStatuses.find(
      (status) =>
        status.value === value
    );
  return item
    ? item.label
    : value;
};

  // ============================================================
  // ADD APPLICATION
  // ============================================================
  const addApplication = () => {
    setTrackerError("");
    // ------------------------------------------------------------
    // COLLEGE REQUIRED
    // ------------------------------------------------------------
    if (!college.trim()) {
      setTrackerError(
        "Please enter a college."
      );
      return;
    }
    // ------------------------------------------------------------
    // MAJOR REQUIRED
    // ------------------------------------------------------------
    if (!major.trim()) {
      setTrackerError(
        "Please enter a major."
      );
      return;
    }
    // ------------------------------------------------------------
    // APPLICATION TYPE REQUIRED
    // ------------------------------------------------------------
    if (!applicationType) {
      setTrackerError(
        "Please select an application type."
      );
      return;
    }
    // ------------------------------------------------------------
    // APPLICATION STATUS REQUIRED
    // ------------------------------------------------------------
    if (!applicationStatus) {
      setTrackerError(
        "Please select an application status."
      );
      return;
    }
    // ------------------------------------------------------------
    // DEADLINE REQUIRED
    // ------------------------------------------------------------
    if (!deadline) {
      setTrackerError(
        "Please enter an application deadline."
      );
      return;
    }
    // ------------------------------------------------------------
    // VALIDATE DEADLINE
    // ------------------------------------------------------------
    const deadlineValidation =
      validateDeadlineValue(
        deadline
      );
    if (!deadlineValidation.valid) {
      setTrackerError(
        deadlineValidation.error
      );
      return;
    }

    // ------------------------------------------------------------
    // CREATE APPLICATION
    // ------------------------------------------------------------
    const newApplication = {
      id:
        Date.now(),
      college:
        college.trim(),
      major:
        major.trim(),
      applicationType:
        applicationType,
      applicationStatus:
        applicationStatus,
      deadline:
        deadline,
      deadlineResult:
        deadlineValidation,
      createdAt:
        new Date().toISOString(),
    };
    // ------------------------------------------------------------
    // ADD TO TRACKER
    // ------------------------------------------------------------
    setApplications(
      (previousApplications) => [
        ...previousApplications,
        newApplication,
      ]
    );
    // ------------------------------------------------------------
    // CLEAR INPUTS
    // ------------------------------------------------------------
    setCollege("");
    setMajor("");
    setApplicationType("");
    setApplicationStatus("");
    setDeadline("");
    setDeadlineResult(null);
    setTrackerError("");
  };




  // ============================================================
  // DELETE APPLICATION
  // ============================================================
  const deleteApplication = (
    applicationId
  ) => {
    setApplications(
      (previousApplications) =>
        previousApplications.filter(
          (application) =>
            application.id !==
            applicationId
        )
    );
  };
  // ============================================================
  // REFRESH TRACKER DEADLINES
  // ============================================================
  const getFreshDeadlineResult = (
    deadlineValue
  ) => {
    return validateDeadlineValue(
      deadlineValue
    );
  };
  // ============================================================
  // CLEAR ALL APPLICATIONS
  // ============================================================
  const clearAllApplications = () => {
    setApplications([]);
  };
  // ============================================================
  // RENDER
  // ============================================================
  return (
    <div className="app">
      {/* ======================================================
          HEADER
      ====================================================== */}
      <header className="app-header">
        <div>
          <h1>
           Applicantra
          </h1>
          <p className="subtitle">
            College application planning made simple.
          </p>
        </div>
      </header>
      {/* ======================================================
          DISCLAIMER
      ====================================================== */}
      <section className="info-card">
        <h2>
          About This Tool
        </h2>
        <p>
          This tool is NOT an admission chance calculator.
        </p>
        <p>
          College admissions depend on many factors,
          including coursework, extracurricular activities,
          application essays, teacher recommendations,
          institutional priorities, and other factors.
        </p>
        <p>
          ACT scores and GPA are only part of an application.
        </p>
        <p>
          Please use this tool for planning purposes only.
        </p>
      </section>
      {/* ======================================================
          ACADEMIC PROFILE
      ====================================================== */}
      <section className="card">
        <h2>
          Academic Profile
        </h2>
        {/* ====================================================
            GPA
        ==================================================== */}
        <div className="input-row">
          <label htmlFor="gpa">
            GPA
          </label>
          <input
            id="gpa"
            type="number"
            value={gpa}
            onChange={handleGpaChange}
            min="0"
            max={
              gpaScale === "custom"
                ? customGpaScale || undefined
                : gpaScale || undefined
            }
            step="0.001"
            placeholder="Enter GPA"
          />
        </div>
        {/* ====================================================
            GPA SCALE
        ==================================================== */}
        <div className="input-row">
          <label htmlFor="gpa-scale">
            GPA Scale
          </label>
          <select
            id="gpa-scale"
            value={gpaScale}
            onChange={handleGpaScaleChange}
          >
            <option value="">
              Select GPA Scale
            </option>
            <option value="4.0">
              4.0
            </option>
            <option value="4.3">
              4.3
            </option>
            <option value="5.0">
              5.0
            </option>
            <option value="5.3">
              5.3
            </option>
            <option value="custom">
              Custom
            </option>
          </select>
        </div>
        {/* ====================================================
            SCALE DESCRIPTION
        ==================================================== */}
        {gpaScale === "4.0" && (
          <p className="field-hint">
            Unweighted (4.0)
          </p>
        )}
        {gpaScale === "4.3" && (
          <p className="field-hint">
            Unweighted (4.3)
          </p>
        )}
        {gpaScale === "5.0" && (
          <p className="field-hint">
            Weighted (5.0)
          </p>
        )}
        {gpaScale === "5.3" && (
          <p className="field-hint">
            Weighted (5.3)
          </p>
        )}
        {/* ====================================================
            CUSTOM GPA SCALE
        ==================================================== */}
        {gpaScale === "custom" && (
          <div className="input-row">
            <label htmlFor="custom-gpa-scale">
              Custom GPA Scale
            </label>
            <input
              id="custom-gpa-scale"
              type="number"
              step="0.1"
              min="1"
              value={customGpaScale}
              onChange={
                handleCustomGpaScaleChange
              }
              placeholder="Enter GPA scale"
            />
          </div>
        )}
        {/* ====================================================
            GPA GOAL
        ==================================================== */}
        <div className="input-row">
          <label htmlFor="gpa-goal">
            GPA Goal
          </label>
          <input
            id="gpa-goal"
            type="number"
            value={gpaGoal}
            onChange={handleGpaGoalChange}
            min="0"
            max={
              gpaScale === "custom"
                ? customGpaScale || undefined
                : gpaScale || undefined
            }
            step="0.001"
            placeholder="Enter GPA goal"
          />
        </div>
        {/* ====================================================
            CALCULATE GPA
        ==================================================== */}
        <button
          type="button"
          className="primary-button"
          onClick={validateGPA}
        >
          Calculate GPA
        </button>
        {/* ====================================================
            GPA RESULT
        ==================================================== */}
        {gpaResult && (
          <div
            className={
              gpaResult.valid
                ? "result-card success"
                : "result-card error"
            }
          >
            <h3>
              GPA Results
            </h3>
            {!gpaResult.valid ? (
              <>
                <p>
                  {gpaResult.message}
                </p>
                <p className="error-text">
                  {gpaResult.error}
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>
                    GPA:
                  </strong>{" "}
                  {gpaResult.gpa}
                </p>
                <p>
                  <strong>
                    Normalized GPA:
                  </strong>{" "}
                  {gpaResult.normalizedGPA}%
                </p>
                <p>
                  <strong>
                    Scale:
                  </strong>{" "}
                  {gpaResult.scaleName}
                </p>
                {gpaResult.customMessage && (
                  <p className="field-hint">
                    {gpaResult.customMessage}
                  </p>
                )}
                {/* GPA GOAL */}
                {gpaResult.goal && (
                  <div className="goal-box">
                    <h4>
                      GPA Goal
                    </h4>
                    {gpaResult.goal.valid ? (
                      <>
                        <p>
                          GPA Goal:{" "}
                          {gpaResult.goal.goal}
                        </p>
                        {gpaResult.goal.achieved ? (
                          <p className="success-text">
                            Goal Achieved!
                          </p>
                        ) : (
                          <p>
                            You need{" "}
                            {gpaResult.goal.difference}
                            {" "}
                            more GPA.
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="error-text">
                        {gpaResult.goal.error}
                      </p>
                    )}
                  </div>
                )}
                {/* GPA NOTES */}
                <div className="notes">
                  <p>
                    <strong>
                      Note:
                    </strong>
                  </p>
                  {gpaResult.note.map(
                    (item, index) => (
                      <p
                        key={index}
                      >
                        {item}
                      </p>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </section>
      {/* ======================================================
          ACT
      ====================================================== */}
      <section className="card">
        <h2>
          ACT
        </h2>
        {/* ====================================================
            ACT INPUT
        ==================================================== */}
        <div className="input-row">
          <label htmlFor="act">
            ACT
          </label>
          <input
            id="act"
            className="act-input"
            type="number"
            value={act}
            onChange={handleActChange}
            min="1"
            max="36"
            step="1"
            placeholder="Enter ACT score"
          />
        </div>
        {/* ====================================================
            ACT GOAL
        ==================================================== */}
        <div className="input-row">
          <label htmlFor="act-goal">
            ACT Goal
          </label>
          <input
            id="act-goal"
            className="act-input"
            type="number"
            value={actGoal}
            onChange={handleActGoalChange}
            min="1"
            max="36"
            step="1"
            placeholder="Enter ACT goal"
          />
        </div>
        {/* ====================================================
            CHECK ACT
        ==================================================== */}
        <button
          type="button"
          className="primary-button"
          onClick={validateACT}
        >
          Check ACT
        </button>
        {/* ====================================================
            ACT RESULT
        ==================================================== */}
        {actResult && (
          <div
            className={
              actResult.valid
                ? "result-card success"
                : "result-card error"
            }
          >
            <h3>
              ACT Results
            </h3>
            {!actResult.valid ? (
              <>
                <p>
                  {actResult.message}
                </p>
                <p className="error-text">
                  {actResult.error}
                </p>
              </>
            ) : (
              <>
                <p>
                  <strong>
                    ACT:
                  </strong>{" "}
                  {actResult.act}
                </p>
                {/* ACT GOAL */}
                {actResult.goal && (
                  <div className="goal-box">
                    {actResult.goal.valid ? (
                      <>
                        <h4>
                          ACT Goal
                        </h4>
                        <p>
                          ACT Goal:{" "}
                          {actResult.goal.goal}
                        </p>
                        {actResult.goal.achieved ? (

  <p className="success-text">

    Goal Achieved! You are{" "}

    {actResult.goal.difference}{" "}

    point(s) above your goal.

  </p>

) : (

  <p>

    You need{" "}

    {actResult.goal.difference}{" "}

    more ACT point(s) to reach your goal.

  </p>

)}
                      </>
                    ) : (
                      <p className="error-text">
                        {actResult.goal.error}
                      </p>
                    )}
                  </div>
                )}

                {/* ====================================================

    ACT SCORE PROFILE

==================================================== */}

<div className="act-score-profile">

  {/* NATIONAL RANK */}

  <div className="act-result-item">

    <strong>

      National Rank

    </strong>

    <p>

      {actResult.nationalRank}th percentile

    </p>

  </div>

  {/* SCORE LEVEL */}

  <div className="act-result-item">

    <strong>

      Score Level

    </strong>

    <p>

      {actResult.scoreLevel}

    </p>

  </div>

  {/* COLLEGE READINESS */}

  <div className="act-result-item">

    <strong>

      College Readiness

    </strong>

    <p>

      {actResult.readinessLevel}

    </p>

    <p>

      Composite score alone cannot determine

      subject-level college readiness.

    </p>

  </div>

  {/* ACT GOAL PROGRESS */}

  {actResult.goalProgress !== null && (

    <div className="act-result-item">

      <strong>

        ACT Goal Progress

      </strong>

      <p>

        {actResult.goalProgress.toFixed(1)}%

      </p>

    </div>

  )}

  {/* NATIONAL AVERAGE */}

  <div className="act-result-item">

    <strong>

      National Average Comparison

    </strong>

    <p>

      National Average:{" "}

      {actResult.nationalAverage}

    </p>

    {actResult.differenceFromAverage > 0 ? (

      <p>

        {actResult.differenceFromAverage}{" "}

        point(s) above the national average.

      </p>

    ) : actResult.differenceFromAverage < 0 ? (

      <p>

        {Math.abs(

          actResult.differenceFromAverage

        )}{" "}

        point(s) below the national average.

      </p>

    ) : (

      <p>

        Exactly at the national average.

      </p>

    )}

  </div>

</div>



                {/* ACT NOTES */}
                <div className="notes">
                  <p>
                    <strong>
                      Note:
                    </strong>
                  </p>
                  {actResult.note.map(
                    (item, index) => (
                      <p
                        key={index}
                      >
                        {item}
                      </p>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </section>
      {/* ======================================================
          APPLICATION PLANNER
      ====================================================== */}
      <section className="card">
        <h2>
          College Application
        </h2>
        <p className="section-description">
          Enter an application below and add it to your
          College Application Tracker.
        </p>
        {/* ====================================================
            COLLEGE
        ==================================================== */}
        <div className="input-row">
          <label htmlFor="college">
            College
          </label>
          <input
            id="college"
            type="text"
            value={college}
            onChange={handleCollegeChange}
            placeholder="Enter college name"
          />
        </div>
        {/* ====================================================
            MAJOR
        ==================================================== */}
        <div className="input-row">
          <label htmlFor="major">
            Major
          </label>
          <input
            id="major"
            type="text"
            value={major}
            onChange={handleMajorChange}
            placeholder="Enter major"
          />
        </div>
        {/* ====================================================
            APPLICATION TYPE
        ==================================================== */}
        <div className="input-row">
          <label htmlFor="application-type">
            Application Type
          </label>
          <select
            id="application-type"
            value={applicationType}
            onChange={
              handleApplicationTypeChange
            }
          >
            <option value="">
              Select Application Type
            </option>
            {applicationTypes.map(
              (type) => (
                <option
                  key={type.value}
                  value={type.value}
                >
                  {type.value} — {type.label}
                </option>
              )
            )}
          </select>
        </div>
        {/* ====================================================
            APPLICATION STATUS
        ==================================================== */}
        <div className="input-row">
          <label htmlFor="application-status">
            Application Status
          </label>
          <select
            id="application-status"
            value={applicationStatus}
            onChange={
              handleApplicationStatusChange
            }
          >
            <option value="">
              Select Application Status
            </option>
            {applicationStatuses.map(
              (status) => (
                <option
                  key={status.value}
                  value={status.value}
                >
                  {status.label}
                </option>
              )
            )}
          </select>
        </div>
        {/* ====================================================
            DEADLINE
        ==================================================== */}
        <div className="input-row">
          <label htmlFor="deadline">
            Application Deadline
          </label>
          <input
            id="deadline"
            type="text"
            value={deadline}
            onChange={handleDeadlineChange}
          />
        </div>
        {/* ====================================================
            CHECK DEADLINE
        ==================================================== */}
        <button
          type="button"
          className="secondary-button"
          onClick={validateDeadline}
        >
          Check Deadline
        </button>
        {/* ====================================================
            DEADLINE RESULT
        ==================================================== */}
        {deadlineResult && (
          <div
            className={
              deadlineResult.valid
                ? "result-card success"
                : "result-card error"
            }
          >
            <h3>
              Deadline Result
            </h3>
            {deadlineResult.valid ? (
              <>
                <p>
                  <strong>
                    Deadline:
                  </strong>{" "}
                  {deadlineResult.deadline}
                </p>
                <p>
                  {deadlineResult.message}
                </p>
                <p className="field-hint">
                  This countdown is calculated
                  from the date entered.
                </p>
              </>
            ) : (
              <>
                <p className="error-text">
                  {deadlineResult.error}
                </p>
                {deadlineResult.example && (
                  <p>
                    {deadlineResult.example}
                  </p>
                )}
              </>
            )}
          </div>
        )}
        {/* ====================================================
            TRACKER ERROR
        ==================================================== */}
        {trackerError && (
          <div className="tracker-error">
            <strong>
              Please check your application:
            </strong>
            <p>
              {trackerError}
            </p>
          </div>
        )}
        {/* ====================================================
            ADD APPLICATION
        ==================================================== */}
        <button
          type="button"
          className="primary-button large-button"
          onClick={addApplication}
        >
          Add Application
        </button>
      </section>
      {/* ======================================================
          COLLEGE APPLICATION TRACKER
      ====================================================== */}
      <section className="card tracker-section">
        <div className="tracker-header">
          <div>
            <h2>
              College Application Tracker
            </h2>
            <p className="section-description">
              Track multiple college applications
              in one place.
            </p>
          </div>
          {applications.length > 0 && (
            <button
              type="button"
              className="danger-button"
              onClick={clearAllApplications}
            >
              Clear All
            </button>
          )}
        </div>
        {/* ====================================================
            EMPTY TRACKER
        ==================================================== */}
        {applications.length === 0 ? (
          <div className="empty-tracker">
            <div className="empty-icon">
              +
            </div>
            <h3>
              No applications added yet.
            </h3>
            <p>
              Add your first college application
              using the form above.
            </p>
          </div>
        ) : (
          <div className="tracker-list">
            {applications.map(
              (application) => {
                const freshDeadline =
                  getFreshDeadlineResult(
                    application.deadline
                  );
                return (
                  <div
                    className="application-card"
                    key={application.id}
                  >
                    {/* ======================================
                        APPLICATION HEADER
                    ====================================== */}
                    <div className="application-card-header">
                      <div>
                        <h3>
                          {application.college}
                        </h3>
                        <p className="major-text">
                          {application.major}
                        </p>
                      </div>
                      <button
                        type="button"
                        className="delete-button"
                        onClick={() =>
                          deleteApplication(
                            application.id
                          )
                        }
                      >
                        Delete
                      </button>
                    </div>
                    {/* ======================================
                        APPLICATION INFORMATION
                    ====================================== */}
                    <div className="application-info-grid">
                      <div className="tracker-info">
                        <span className="info-label">
                          Application Type
                        </span>
                        <strong>
                          {application.applicationType}
                        </strong>
                        <span className="info-subtext">
                          {getApplicationTypeLabel(
                            application.applicationType
                          )}
                        </span>
                      </div>
                      <div className="tracker-info">
                        <span className="info-label">
                          Status
                        </span>
                        <strong>
                          {getApplicationStatusLabel(
                            application.applicationStatus
                          )}
                        </strong>
                      </div>
                      <div className="tracker-info">
                        <span className="info-label">
                          Deadline
                        </span>
                        <strong>
                          {application.deadline}
                        </strong>
                      </div>
                    </div>
                    {/* ======================================
                        LIVE COUNTDOWN
                    ====================================== */}
                    <div className="tracker-deadline">
                      <span className="info-label">
                        Deadline Status
                      </span>
                      {freshDeadline.valid ? (
                        <>
                          <strong
                            className={
                              freshDeadline.type ===
                              "passed"
                                ? "deadline-passed"
                                : freshDeadline.type ===
                                  "today"
                                ? "deadline-today"
                                : "deadline-future"
                            }
                          >
                            {freshDeadline.message}
                          </strong>
                        </>
                      ) : (
                        <strong className="deadline-passed">
                          {freshDeadline.error}
                        </strong>
                      )}
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </section>
      {/* ======================================================
          FOOTER
      ====================================================== */}
      <footer className="app-footer">
        <p>
          Applicantra
        </p>
        <p>
          A college planning tool.
        </p>
      </footer>
    </div>
  );
}
export default App;