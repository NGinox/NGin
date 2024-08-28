import Button from "../../../ui/Button.tsx";
import tgIcon from "../../../assets/tg-icon.webp"
import {useState} from "react";
import {Sheet} from "react-modal-sheet";
import {styled} from 'styled-components';
import {Link} from "react-router-dom";
import SubscriberService from "../../../services/subscriber.service.ts";
import toast from "react-hot-toast";
import {Task, TaskType} from "../../../types/task.type.ts";
import {useMutation} from "@tanstack/react-query";

const TaskBox = ({task, subscriberId} : {task: Task, subscriberId: number}) => {


    const [isOpen, setOpen] = useState(false);

    const CustomSheet = styled(Sheet)`
      .react-modal-sheet-backdrop {
        /* custom styles */
      }
      .react-modal-sheet-container {
          padding: 0 32px 0 32px;
          background-color: #271732 !important;
          border-radius: 32px 32px 0px 0px !important;
      }
      .react-modal-sheet-header {
          
        /* custom styles */
      }
      .react-modal-sheet-drag-indicator {
          background-color: white !important;
        /* custom styles */
      }
      .react-modal-sheet-content {
        /* custom styles */
      }`;
    const [completed, setCompleted] = useState(task.completed)
    const [isPending, setIsPending] = useState(false)

    const completeTaskMutation = useMutation({
        mutationFn: () => {
            return SubscriberService.completeTask(task._id, subscriberId)
        },
        onSuccess: () => {
            setIsPending(false)
            setCompleted(true)
            setOpen(false)
            toast.success('Task completed!')
        },
    })

    const checkCompleted = () => {
        setIsPending(true)

        switch (task.type) {
            case TaskType.telegramGroup:
                SubscriberService.verifyMemberOfChat(getTelegramChatNameFromLink(task.link), subscriberId).then(res => {
                    if (res.ok) {
                        completeTaskMutation.mutate()
                    }

                    else {
                        setIsPending(false)
                        toast.success('Not completed')
                    }
                })
                break;
            default:
                return null
        }

    }

    const getTelegramChatNameFromLink = (url: string): string => {
        const regexp = /[^/]+$/;
        return '@' + url.match(regexp)![0];
    }

    function removeProtocol(url: string) {
        // Remove the protocol (http:// or https://)
        return url.replace(/^https?:\/\//, '');
    }

    return (
        <div
            className="bg-[#271732] shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] text-white p-4 rounded-xl flex flex-col gap-2 w-full">
            <div className="flex gap-4 grow-0">
                <div className="bg-[#E23969] w-[40px] h-[40px] rounded-[10px] grid place-items-center p-2">
                    <img src={tgIcon} alt=""/>
                </div>
                <div className="flex-1 flex flex-col">
                    <div>{task.title}</div>
                </div>

                {completed ?
                    <div className="text-green-500">Completed</div>
                    :
                    <Button text={"+ 2000"} onClick={() => setOpen(true)}/>
                }

                <CustomSheet isOpen={isOpen} onClose={() => setOpen(false)} detent={'content-height'}
                             className={`${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out`}>
                    <Sheet.Container>
                        <Sheet.Header />
                        <Sheet.Content>
                            <div className="flex flex-col items-center text-white font-futuraRegular pb-8">

                                <div className="text-3xl">{task.title}</div>
                                <Link
                                    to={'https://t.me/GPTapcom'}
                                    className="bg-[#E23969] w-[60px] h-[60px] rounded-[10px] grid place-items-center p-2 mt-8">
                                    <img src={tgIcon} alt=""/>
                                </Link>

                                <div className="text-xl mt-2 opacity-80">Open {removeProtocol(task.link)}</div>

                                <div className="mt-4">
                                    {task.description}
                                </div>

                                <Button
                                    text={"Check"}
                                    style={"text-2xl self-center ml-0 mt-8 max-w-full text-center"}
                                    onClick={() => checkCompleted()}
                                    isPending={isPending}
                                />
                            </div>
                        </Sheet.Content>
                    </Sheet.Container>
                    <Sheet.Backdrop/>
                </CustomSheet>
            </div>
        </div>
    );
};

export default TaskBox;