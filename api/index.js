const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
var bodyParser = require("body-parser");
const settingRoute = require("./routes/setting");
const studentRoute = require("./routes/student");
const gradeRoute = require("./routes/grade");
const cClassRoute = require("./routes/cClass");
// const subjectRoute = require("./routes/subject");
// const coEffectRoute = require("./routes/coEffect");
// const termRoute = require("./routes/term");
// const schoolYearRoute = require("./routes/schoolYear");
// const reportedSubject = require("./routes/reportedSubject");
// const reportedTerm = require("./routes/reportedTerm");

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
dotenv.config();
app.use(express.json());

//ROUTES
app.use("/api/setting", settingRoute);
app.use("/api/student", studentRoute);
app.use("/api/grade", gradeRoute);
app.use("/api/class", cClassRoute);
// app.use("/api/subjects", subjectRoute);
// app.use("/api/coEffects", coEffectRoute);
// app.use("/api/termRoute", termRoute);
// app.use("/api/schoolYears", schoolYearRoute);
// app.use("/api/reportedSubjects", reportedSubject);
// app.use("/app/reportedTerms", reportedTerm);

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.listen(5000, () => {
  console.log("Backend is running on port 5000");
});