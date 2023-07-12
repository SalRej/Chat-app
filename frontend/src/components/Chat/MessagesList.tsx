import { Avatar, Stack } from '@mui/material'
import React, { useRef, useEffect, useContext } from 'react'
import TextMessage from './TextMessage'
import FileMessage from './FileMessage'
import type User from '../../interfaces/User'
import AuthContext from '../../context/AuthContext'
import ChatAvatar from './ChatAvatar'
import { useMutation } from '@tanstack/react-query'
import axiosInstance from '../../config/axiosInstance'
import type Message from '../../interfaces/Message'
import IconMessage from './IconMessage'
import EmptyChat from './EmptyChat'
import InfiniteScroll from 'react-infinite-scroll-component'

interface Props {
  messages: Message[]
  userToChat: User | null
  fetchMoreMessages: () => void
}

const MessagesList = ({ messages, userToChat, fetchMoreMessages }: Props): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null)
  const { user } = useContext(AuthContext)

  const { mutate: seeMessage } = useMutation({
    mutationFn: async ({ recieverId, messageId }: { recieverId: string, messageId: string }) => {
      return await axiosInstance.post('/message/seen', {
        recieverId,
        messageId
      })
    }
  })

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [userToChat?.id])

  useEffect(() => {
    const lastMessage = messages[0]
    if (lastMessage?.senderId !== userToChat?.id) {
      return
    }

    if (lastMessage && userToChat?.id && lastMessage.senderId !== user?.id) {
      seeMessage({ recieverId: userToChat?.id, messageId: lastMessage.id })
    }
  }, [userToChat?.id, messages.length])

  return (
    <Stack id="scrollableDiv" sx={{ overflowY: 'scroll', flex: '1 1 0', pb: 2 }} direction="column-reverse" ref={containerRef}>
      { messages.length === 0
        ? <EmptyChat userToChat={userToChat} />
        : <InfiniteScroll
            dataLength={messages.length}
            next={fetchMoreMessages}
            hasMore={true}
            style={{ display: 'flex', flexDirection: 'column-reverse' }}
            loader={<h4>Loading...</h4>}
            scrollableTarget="scrollableDiv"
            inverse={true}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
          {(
            messages.map((message: Message, index: number) => {
              const isSender = message.senderId !== userToChat?.id
              const currentUserId = message.senderId === user?.id ? user?.id : userToChat?.id

              const prevUserIndex = index - 1 < 0 ? 0 : index - 1
              const prevUserId = messages[prevUserIndex].senderId === user?.id ? user?.id : userToChat?.id
              const isUserChanged = currentUserId !== prevUserId

              return (
                  <Stack
                    key={message.id}
                    direction={isSender ? 'row-reverse' : 'row'}
                    alignItems="center"
                    spacing={1}
                    sx={{ marginTop: index === 0 ? 'auto' : 'inherit' }}
                  >
                      {isUserChanged || (index === 0)
                        ? <ChatAvatar user={user} userToChat={userToChat} isSender={isSender} />
                        : <Avatar sx={{ bgcolor: 'transparent' }}></Avatar> }
                      {
                        message.isText &&
                        <TextMessage
                          message={message}
                          userToChat={userToChat}
                        />
                      }
                      {
                        message.isImage &&
                        <FileMessage
                          message={message}
                          userToChat={userToChat}
                        />
                      }
                      {
                        message.isIcon &&
                        <IconMessage
                          message={message}
                          userToChat={userToChat}
                        />
                      }
                  </Stack>
              )
            })
          )
          }</InfiniteScroll>
      }
    </Stack>
  )
}

export default MessagesList
