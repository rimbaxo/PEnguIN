import { useEffect, useState } from 'react';
import { Message as RNGCMessage, MessageProps, IMessage } from 'react-native-gifted-chat';
import { useTheme } from 'react-native-paper';

const Message = (
  props: Readonly<MessageProps<IMessage>> &
    Readonly<{
      children?: React.ReactNode;
    }>
) => {
  const {
    currentMessage: { _id },
    extraData: { selectedMessages },
  } = props;
  const [isSelected, setIsSelected] = useState(false);
  const { colors } = useTheme();

  useEffect(() => {
    setIsSelected(selectedMessages.includes(_id.toString()));
  }, [selectedMessages]);

  const backgroundColor = isSelected ? `${colors.palepink}88` : null;

  return (
    <RNGCMessage
      extraData={{ selectedMessages }}
      shouldUpdateMessage={() => true}
      containerStyle={{
        left: { backgroundColor, marginLeft: 0, paddingHorizontal: 10, alignItems: 'center' },
        right: { backgroundColor, marginRight: 0, paddingHorizontal: 10, alignItems: 'center' },
      }}
      {...props}
    />
  );
};

export default Message;
