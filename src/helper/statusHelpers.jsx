export const statusStyles = (statusId) => {
  switch (statusId) {
    case "1":
      return {
        backgroundColor: "blue",
        label: "New",
      };
    case "2":
      return {
        backgroundColor: "yellow",
        label: "Active",
      };
    case "3":
      return {
        backgroundColor: "green",
        label: "Done",
      };
    default:
      return {
        backgroundColor: "gray",
        label: "No Status",
      };
  }
};

export const commonStatusStyle = {
  borderRadius: "6px",
  fontSize: "20px",
  fontWeight: "600",
  color: "white",
  width: "100px",
  padding: "10px",
  textAlign: "center",
};
