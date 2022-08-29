import { Avatar, Box, Divider, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { DateFormatterService } from "../../services/dateFormatterService";
import { RootState } from "../../services/redux-services/features";
import {
  findConsultantByIdStart,
  IConsultantState,
} from "../../services/redux-services/features/consultantSlice";
import { getUsername } from "../../services/redux-services/utils";

const ConsultantDetails = () => {
  const { id: consultantId } = useParams();
  const dispatch = useDispatch();
  const { consultantDetails } = useSelector<RootState, IConsultantState>(
    (state) => state.consultant
  );

  console.log("consultant details", consultantDetails);

  useEffect(() => {
    if (consultantId) {
      dispatch(findConsultantByIdStart(consultantId));
    }
  }, [consultantId, dispatch]);

  return (
    <Box>
      <Typography variant="h4" color="text.primary" align="center">
        Détails
      </Typography>
      {consultantDetails && (
        <>
          <Box
            {...{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 3,
              flexDirection: "column",
            }}
          >
            <Avatar
              {...{
                alt: getUsername(
                  consultantDetails.firstName,
                  consultantDetails.lastName
                ),
                src: "/static/images/avatar/1.jpg",
                sx: {
                  width: 100,
                  height: 100,
                },
              }}
            />
            <Typography variant="h2" color="text.primary" align="center">
              {getUsername(
                consultantDetails.firstName,
                consultantDetails.lastName
              )}
            </Typography>

            <Typography variant="body1" color="text.secondary" align="center">
              {consultantDetails.emailAddress}
            </Typography>

            <Typography variant="body1" color="text.secondary" align="center">
              {consultantDetails.phone ?? ""}
            </Typography>
          </Box>
          <Divider variant="middle" />
          <Box
            {...{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 3,
              flexDirection: "column",
            }}
          >
            <Box
              {...{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle1" color="text.primary">
                Status :
              </Typography>
              <Typography variant="body1" color="primary">
                {consultantDetails.status?.displayText ?? "N/A"}
              </Typography>
            </Box>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={6}>
                <Box
                  {...{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1" color="text.primary">
                    Date de début :
                  </Typography>
                  <Typography variant="body1" color="primary">
                    {DateFormatterService.dateToString(
                      consultantDetails.startDate
                    )}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box
                  {...{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="subtitle1" color="text.primary">
                    Date de fin :
                  </Typography>
                  <Typography variant="body1" color="primary">
                    {DateFormatterService.dateToString(
                      consultantDetails.endDate
                    )}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ConsultantDetails;
