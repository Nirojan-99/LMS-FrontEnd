import Week from "./Components/Week/Week";

const Weeks = () => {
  const datas = [
    {
      _id:"2",
      week: "1",
      module: "it2020",
      content: [
        {
          _id: "3",
          title: "lecture 1",
          visibility: "visible",
          type: "file",
        },
        {
          _id: "1",
          title: "lecture 1",
          visibility: "invisible",
          type: "submission",
        },
        {
          _id: "1",
          title: "lecture 1",
          visibility: "visible",
          type: "quiz",
        },
        {
          _id: "1",
          title: "lecture 1",
          visibility: "visible",
          type: "attandance",
        },
        {
          _id: "1",
          title: "lecture 1",
          visibility: "visible",
          type: "notes",
        },
      ],
    },
    {
      _id:"1",
      week: "2",
      module: "it2020",
      content: [
        {
          _id: "3",
          title: "lecture 2",
          visibility: "visible",
          type: "submission",
        },
      ],
    },
    {
      _id:"3",
      week: "3",
      module: "it2020",
      content: [
        {
          _id: "2",
          title: "lecture 2",
          visibility: "visible",
          type: "attandance",
        },
      ],
    },
  ];
  return (
    <>
      {datas.map((row) => {
        return <Week row={row} />;
      })}
    </>
  );
};

export default Weeks;
