import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import styled from "styled-components";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const NodeFilter = styled(FormControl)`
  background-color: white;
`;

const StyledInfoOutlinedIcon = styled(InfoOutlinedIcon)`
    opacity: 0.5
`;

const FilterSection = ({ nodeNames, selectedField, onSelectField }) => {
  const handleChange = (event: SelectChangeEvent) => {
    onSelectField(event.target.value);
  };

  return (
    <div className="filter-section">
      <NodeFilter size="small" sx={{ m: 1, minWidth: 200 }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedField}
          onChange={handleChange}
        >
          {nodeNames.map((name) => {
            return (
              <MenuItem value={name} key={name}>
                {name}
              </MenuItem>
            );
          })}
        </Select>
      </NodeFilter>
      <StyledInfoOutlinedIcon />
    </div>
  );
};

export default FilterSection;
