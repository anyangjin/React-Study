import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function List({ todoData, setTodoData }) {
  const handleCompleteChange = (id) => {
    const newTodoData = todoData.map((data) => {
      //  리스트에 있는 객체가 하나씩 들어오는데 그 객체의 data.id 가 완료처리할 id와 같을때 completed의 상태를 (true -> false또는 false->true) 반대로
      // 바꿔주고 그 객체를 반환하고 id값이 다르면 원래의 객체 그대로 반환한다.
      // map -> 배열의 인자갯수만큼 콜백함수에서 반환된 값들로 새 배열을 만들어줌. 콜백함수의 인자값에는 배열의 요소가 하나씩 들어옴. ex)  배열.map((배열의 요소)=>반환할 값)
      return data.id === id ? { ...data, completed: !data.completed } : data;
    });

    // let newTodoData = todoData.map((data) => {
    //   if (data.id === id) {
    //     data.completed = !data.completed;
    //   }
    //   return data;
    // });

    setTodoData(newTodoData);
  };

  const handleClick = (id) => {
    const newTodoData = todoData.filter((data) => data.id !== id);
    setTodoData(newTodoData);
  };
  // todoData 배열에서 삭제할 id와 다른것만 filter로 걸러 삭제하려는 아이템을 제회한 배열을 만듬. setTodoData로 삭제하려는 아이템을 제외한 배열을 저장. .

  const handleEnd = (result) => {
    if (!result.destination) return;
    // result.destination없으면 바로 return => 함수 끝남.

    const newTodoData = todoData;

    const reorderItem = newTodoData.splice(result.source.index, 1);
    //   result.source.index => Draggable component의 index prop으로 넣어준 원래 위치.
    //  splice를 사용해 변경할 아이템이 newTodoData에서 지워지고 reorderItem에는 지워진 아이템이 들어감.

    // newTodoData배열에서 원하는 자리(result.destination.index=> 갈려는 위치)에 reorderItem을 넣음.
    newTodoData.splice(result.destination.index, 0, reorderItem[0]);
    setTodoData(newTodoData);
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleEnd}>
        <Droppable droppableId="todo">
          {(provided) => (
            <div
              {...provided.DroppableProps}
              className="todo"
              ref={provided.innerRef}
            >
              {/* {["we", 2, 3, 4].map((ele) => (
                <div>강남 스터디{ele}</div>
              ))} */}
              {todoData.map((data, index) => (
                <Draggable
                  key={data.id.toString()}
                  draggableId={data.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      key={data.id}
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      className={`${
                        snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
                      }  flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 bg-gray-100 border rounded`}
                    >
                      <div>
                        <input
                          type="checkbox"
                          defaultChecked={false}
                          onChange={() => handleCompleteChange(data.id)}
                        />
                        <span
                          className={`${
                            data.completed ? "line-through" : ""
                          } ml-2`}
                        >
                          {data.title}
                        </span>
                      </div>
                      <div>
                        <button
                          className="px-4 py-2 float-right"
                          onClick={() => handleClick(data.id)}
                        >
                          x
                        </button>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
