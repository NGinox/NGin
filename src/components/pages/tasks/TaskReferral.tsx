import person from "../../../images/person.svg";
import giftBox from "../../../images/gift-box.svg";
import Button from "../../../ui/Button.tsx";
import {useState} from "react";
import toast from "react-hot-toast";
import copySvg from '../../../images/copy.svg'
import BottomSheet from "../../../ui/BottomSheet.tsx";
import '../../../App.css'
import {initUtils} from "@tma.js/sdk";
import {useOutletContext} from "react-router-dom";
import {CombinedSubscriberData} from "../../../types/subscriber.type.ts";

const TaskReferral = () => {

    const subscriber = useOutletContext<CombinedSubscriberData>()


    const [isOpen, setIsOpen] = useState(false)
    const [copiedToClipboard, setCopiedToClipboard] = useState(false)

    const inviteLinkTelegramShare = `https://t.me/share/url?url=${encodeURIComponent(`https://t.me/GPTapBot/start?startapp=${subscriber.user_id}`)}&text=${encodeURIComponent("Join GPT Tap Bot! It's awesome!")}`
    const inviteLink = `https://t.me/GPTapBot/start?startapp=${subscriber.user_id}`

    const copyInviteLink = () => {
        navigator.clipboard.writeText(inviteLink)
            .then(() => {
                toast.success("Invite link copied!")
                setCopiedToClipboard(true)
                setTimeout(() => {
                    setCopiedToClipboard(false)
                }, 1000)
            })
    }

    const handleShareInviteLink = () => {
        const utils = initUtils()
        utils.openTelegramLink(inviteLinkTelegramShare)
    }

    return (
        <div
            className="bg-[#271732] shadow-[0_0_15px_5px_rgba(0,0,0,0.1)] text-white p-4 rounded-xl flex flex-col gap-2 w-full">
            <div className="flex gap-4 grow-0 items-center">
                <div className="bg-[#E23969] w-[40px] h-[40px] rounded-[10px] grid place-items-center p-2">
                    <img src={person} alt=""/>
                </div>
                <div className="flex-1 flex flex-col">
                    <div>Invite frens</div>
                </div>

                <Button text={"Invite"} onClick={() => setIsOpen(true)}/>

                <BottomSheet isOpen={isOpen} setIsOpen={setIsOpen}>
                    <div className="flex flex-col items-center text-white font-futuraRegular pb-8">
                        <div className="text-3xl">Invite frens</div>
                        <div className="text-center mt-2">
                            We hope you have some friends, because in that case you can share GPTap and receive a bonus!
                        </div>
                        <div
                            className="rounded-3xl flex flex-col items-center p-2 pr-8 pl-8 pb-6 mt-8 w-full animatedBackground"

                        >
                            <div className="p-2 bg-white rounded-xl mt-2 animate-pulse">
                                <img src={giftBox} alt={''} className="h-[32px] w-[32px]"/>
                            </div>
                            <div className="text-xl mt-4">
                                2000 GPT Tokens for You
                            </div>
                            <div>and</div>
                            <div className="text-xl ">
                                1000 GPT Tokens for fren
                            </div>
                        </div>
                        <div className="flex mt-8 w-full gap-2">
                            <div className="flex-1">
                                <Button
                                    text={"Send to fren"}
                                    style={"text-2xl self-center ml-0 max-w-full text-center w-full"}
                                    onClick={handleShareInviteLink}
                                    isPending={false}
                                />
                            </div>
                            <span className={`p-2 rounded-xl bg-[#E23969] ${copiedToClipboard && 'bg-green-500'} flex items-center transition-all duration-300`} onClick={copyInviteLink}>
                                <img src={copySvg} alt="" height={32} width={32}/>
                            </span>
                        </div>
                    </div>
                </BottomSheet>


            </div>
        </div>

    );
};

export default TaskReferral;