import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../services/redux-services/features";
import {
  findAllStatusStart,
  IStatus,
  IStatusState,
} from "../../services/redux-services/features/statusSlice";

import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Button } from "@mui/material";
import { findAllConsultantsStart } from "../../services/redux-services/features/consultantSlice";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  name: IStatus,
  personName: readonly IStatus[],
  theme: Theme
) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
const StatusList = () => {
  const dispatch = useDispatch();
  const { loading, statusList } = useSelector<RootState, IStatusState>(
    (state) => state.status
  );
  const navigate = useNavigate();

  const theme = useTheme();
  const [selectedStatus, setSelectedStatus] = React.useState<IStatus[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof statusList>) => {
    const {
      target: { value },
    } = event;
    setSelectedStatus(value as IStatus[]);
  };

  useEffect(() => {
    dispatch(findAllStatusStart());
  }, []);

  const handleFilterConsultants = () => {
    dispatch(
      findAllConsultantsStart({
        statusIds: selectedStatus.map((s) => s.id),
      })
    );
    navigate("/consultants");
  };

  return (
    <div style={{ display: "flex" }}>
      <FormControl sx={{ m: 1, display: "flex", flexDirection: "row" }}>
        <InputLabel id="status-chip-label">Status</InputLabel>
        <Select
          labelId="status-chip"
          id="status-chip"
          multiple
          value={selectedStatus}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Status" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value.id} label={value.displayText} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
          sx={{ width: 300 }}
        >
          {statusList.map((i) => (
            <MenuItem
              key={i.id}
              value={i as any}
              style={getStyles(i, selectedStatus, theme)}
            >
              {i.displayText}
            </MenuItem>
          ))}
        </Select>
        <Button
          variant="contained"
          disableElevation
          onClick={handleFilterConsultants}
        >
          Rechercher
        </Button>
      </FormControl>
    </div>
  );
};

export default StatusList;
