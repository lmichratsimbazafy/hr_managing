import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/redux-services/features";
import {
  findAllConsultantsStart,
  IConsultantState,
} from "../../services/redux-services/features/consultantSlice";
import { getUsername } from "../../services/redux-services/utils";
import { Link, Outlet, useParams } from "react-router-dom";
import "../../App.css";
import { Box, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const ConsultantsList = () => {
  const dispatch = useDispatch();
  const { consultants, loading } = useSelector<RootState, IConsultantState>(
    (state) => state.consultant
  );
  useEffect(() => {
    dispatch(findAllConsultantsStart());
  }, []);

  const { id } = useParams();

  return (
    <Grid container spacing={2} mt={2}>
      <Grid item xs={5}>
        <Item>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {consultants.map((c, index) => (
              <div key={c.id}>
                <Link
                  {...{
                    to: `/consultants/${c.id}`,
                    style: {
                      color: "rgba(0, 0, 0, 0.54)",
                      textDecoration: "none",
                    },
                  }}
                >
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <Avatar
                        alt={getUsername(c.firstName, c.lastName)}
                        src="/static/images/avatar/1.jpg"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={getUsername(c.firstName, c.lastName)}
                      secondary={
                        <React.Fragment>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {c.status?.displayText ?? "N/A"}
                          </Typography>
                          {` — ${c.emailAddress}`}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </Link>
                {index !== consultants.length - 1 ? (
                  <Divider variant="inset" component="li" />
                ) : null}
              </div>
            ))}
          </List>
        </Item>
      </Grid>
      {id && (
        <Grid item xs={7}>
          <Item>
            <Outlet />
          </Item>
        </Grid>
      )}
    </Grid>
  );
};

export default ConsultantsList;
