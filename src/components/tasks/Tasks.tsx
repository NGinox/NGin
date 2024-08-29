import TaskBox from "./layouts/TaskBox.tsx";
import {useOutletContext} from "react-router-dom";
import {CombinedSubscriberData} from "../../types/subscriber.type.ts";

const Tasks = () => {

    const subscriber = useOutletContext<CombinedSubscriberData>();

    return (
        <div className="flex-1 flex flex-col max-h-full">
            <div className="text-3xl pb-4 text-center">
                <div className="inline-block relative">
                    Tasks
                    <span className="absolute ml-2"> 🎯</span>
                </div>
            </div>
            <div className="text-xs text-center font-futuraRegular">
                <span className="text-sm">Here you can earn more tokens by completing the tasks!</span>
            </div>
            <div className="grid grid-cols-1 gap-4 mt-6 pb-4">

                {
                    subscriber.tasks?.map(task => <TaskBox task={task} subscriberId={subscriber.user_id} subscriberTokens={subscriber.tokens}/>)
                }

            </div>

        </div>
    );
};

export default Tasks;