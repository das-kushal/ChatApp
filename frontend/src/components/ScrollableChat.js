import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
    isLastMessage,
    isSameSender,
    isSameSenderMargin,
    isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
    const { user } = ChatState();
    return (
        <ScrollableFeed>
            {messages &&
                messages.map((m, i) => (
                    <div style={{ display: "flex" }} key={m._id}>
                        {(isSameSender(messages, m, i, user._id) ||
                            isLastMessage(messages, i, user._id)) && (
                                <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                                    <Avatar
                                        mt="7px"
                                        mr={1}
                                        size="sm"
                                        cursor="pointer"
                                        name={m.sender.name}
                                        src={m.sender.pic}
                                    />
                                </Tooltip>
                            )}
                        <div
                            style={{
                                backgroundColor: `${m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                                    }`,
                                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                                borderRadius: "10px",
                                padding: "5px 15px",
                                maxWidth: "75%",
                                    fontWeight: "bold",
                            }}
                        >
                            {m.content}
                            <div className="timeStamp" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end", fontSize: "10px", fontWeight: "900" }}>

                                <p >{new Date(m.createdAt).toLocaleDateString()}</p>
                                <p >{new Date(m.createdAt).toLocaleTimeString()}</p>
                            </div>
                        </div>

                    </div>
                ))}
        </ScrollableFeed>
    );
};

export default ScrollableChat;