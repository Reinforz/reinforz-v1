import { Box, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { AiFillCheckSquare } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import { Markdown } from "../../../components";
import { useThemeSettings } from "../../../hooks";
import { ISelectQuestionResult } from "../../../types";
import "./ReportOptions.scss";

interface Props {
  question: ISelectQuestionResult
  userAnswers: string[]
  className?: string
}

export function ReportOptions(props: Props) {
  const { question } = props;
  const { theme } = useThemeSettings();

  return <Box className={`Report-Options bg-base mb-5 p-5 pb-0 flex-1 ${props.className ?? ''}`}>
    {question.options.map((option, answerIndex) => {
      return <Box className="Report-Options-container mb-5 p-5 bg-dark pb-0 flex flex-col" key={option.text}>
        <Box className="Report-Options-container-item flex justify-between mb-5 justify-between items-center">
          <Typography className={`flex p-10 justify-center items-center bold fs-18`}>{answerIndex + 1}</Typography>
          <Markdown classNames={{
            typography: `Report-Options-container-item-text flex-1 bg-light flex items-center p-10`
          }} content={option.text} />
          {option.isCorrect ? <Box className="bg-light flex items-center justify-center p-5 ml-5"><AiFillCheckSquare fill={green[500]} style={{ padding: 5 }} size={17.5} /></Box> : null}
          {option.userSelected ? <Box className="bg-light flex items-center justify-center p-5 ml-5"><FaUser fill={theme.palette.text.primary} style={{ padding: 5 }} size={17.5} /> </Box> : null}
        </Box>
        {question.answers[answerIndex]?.explanation ? <Box className="Report-Options-container-item-explanation bg-light mb-5 p-10 fs-18">
          <Markdown content={question.answers[answerIndex].explanation!} />
        </Box> : null}
      </Box>
    })}
  </Box>

}