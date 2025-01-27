// import { Box, Drawer, IconButton, Stack, Typography } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import React from "react";
// import FilterTop from "./FilterTop";
// import FilterCenter from "./FilterCenter";
// import FilterBottom from "./FilterBottom";
// const FilterDrawer = ({open, setOpen, data}) => {
//   return (
//     <>
//       <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
//         <Box width="300px" sx={{ p: 2 }}>
//           <Stack
//             direction="row"
//             sx={{ justifyContent: "space-between", alignItems: "center" }}
//           >
//             <IconButton onClick={() => setOpen(false)}>
//               <CloseIcon />
//             </IconButton>
//             <Typography variant="body1">Filter</Typography>
//           </Stack>
//           <FilterTop />
//           <FilterCenter />
//           <FilterBottom data={data} />
//         </Box>
//       </Drawer>
//     </>
//   );
// };

// export default FilterDrawer;

import { Box, Drawer, IconButton, Stack, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import FilterTop from "./FilterTop";
import FilterCenter from "./FilterCenter";
import FilterBottom from "./FilterBottom";
import FilterSearch from "./FilterSearch";
const FilterDrawer = ({
  open,
  setOpen,
  selectedId,
  loader,
  setSelectedId,
  setLoader,
  fetchingData,
  setFetchingData,
  value,
  setValue,
  brands,
  selectedBrand,
  setSelectedBrand,
}) => {
  return (
    <>
      <Drawer open={open} onClose={() => setOpen(false)} anchor="right">
        <Box width="300px" sx={{ p: 2 }}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <IconButton onClick={() => setOpen(false)}>
              <CloseIcon />
            </IconButton>
            <Typography variant="body1">Filter</Typography>
          </Stack>
          <FilterTop
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            loader={loader}
            setLoader={setLoader}
            fetchingData={fetchingData}
            setFetchingData={setFetchingData}
          />
          <FilterCenter
            value={value}
            setValue={setValue}
            setFetchingData={setFetchingData}
          />
          <FilterBottom data={brands} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />
          {/* <FilterSearch search={search} setSearch={setSearch} /> */}
        </Box>
      </Drawer>
    </>
  );
};

export default FilterDrawer;
