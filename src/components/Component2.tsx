import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  FormControlLabel,
} from "@mui/material";

interface SubDepartment {
  name: string;
  isSelected: boolean;
}

interface Department {
  department: string;
  isOpen: boolean;
  isSelected: boolean;
  sub_departments: SubDepartment[];
}

const initialData: Department[] = [
  {
    department: "customer_service",
    isOpen: false,
    isSelected: false,
    sub_departments: [
      { name: "support", isSelected: false },
      { name: "customer_success", isSelected: false },
    ],
  },
  {
    department: "design",
    isOpen: false,
    isSelected: false,
    sub_departments: [
      { name: "graphic_design", isSelected: false },
      { name: "product_design", isSelected: false },
      { name: "web_design", isSelected: false },
    ],
  },
];

const Component2: React.FC = () => {
  const [data, setData] = useState<Department[]>(initialData);

  const handleDepartmentCheckbox = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    e.stopPropagation();
    e.preventDefault();
    const newData = [...data];

    newData[index].isSelected = !newData[index].isSelected;

    // Select or dis-Select all the sub departments on main dapartment click
    newData[index].sub_departments.forEach((_, i) => {
      newData[index].sub_departments[i].isSelected = newData[index].isSelected;
    });

    setData(newData);
  };

  const handleDepartmentToggle = (index: number) => () => {
    setData((prevData) => {
      const newData = [...prevData];
      newData[index].isOpen = !newData[index].isOpen;

      return newData;
    });
  };

  const handleSubDepartmentToggle =
    (depIndex: number, subDepIndex: number) => () => {
      setData((prevData) => {
        const newData = [...prevData];
        const subDepartment = newData[depIndex].sub_departments[subDepIndex];

        subDepartment.isSelected = !subDepartment.isSelected;

        // Check if all sub-departments are selected
        const allSelected = newData[depIndex].sub_departments.every(
          (subDep) => subDep.isSelected
        );

        // If all subdepartments are selected do the thing
        newData[depIndex].isSelected = allSelected;

        return newData;
      });
    };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">
        Component 2: Departments and Sub-Departments
      </h2>
      {data.map((department, depIndex) => (
        <Accordion
          onChange={handleDepartmentToggle(depIndex)}
          key={depIndex}
          expanded={department.isOpen}
          className="mb-4"
        >
          <AccordionSummary
            expandIcon={
              department.isOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />
            }
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={department.isSelected}
                  onChange={(e) => handleDepartmentCheckbox(e, depIndex)}
                />
              }
              label={department.department}
            />
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {department.sub_departments.map((subDepartment, subDepIndex) => (
                <ListItem
                  key={subDepIndex}
                  onClick={handleSubDepartmentToggle(depIndex, subDepIndex)}
                  button
                  className="ml-4"
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={subDepartment.isSelected}
                        disableRipple
                      />
                    }
                    label={subDepartment.name}
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default Component2;
