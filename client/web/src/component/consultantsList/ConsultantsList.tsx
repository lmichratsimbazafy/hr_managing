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

const ConsultantsList = () => {
  const dispatch = useDispatch();
  const { consultants, loading } = useSelector<RootState, IConsultantState>(
    (state) => state.consultant
  );
  useEffect(() => {
    dispatch(findAllConsultantsStart());
  }, []);

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {consultants.map((c, index) => (
        <div key={c.id}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt={getUsername(c.firstName, c.lastName)}
                // src="/static/images/avatar/1.jpg"
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
          {index !== consultants.length - 1 ? (
            <Divider variant="inset" component="li" />
          ) : null}
        </div>
      ))}
    </List>
  );
};

export default ConsultantsList;
