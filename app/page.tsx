"use client"

import { useState } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Toaster } from "@/components/ui/toaster"
import { KakaoButton } from "@/components/kakao-button"

interface Friend {
  id: string
  name: string
  maskedName: string
  generation: string
}

export default function FriendMessenger() {
  const [message, setMessage] = useState("")
  const [selectedFriends, setSelectedFriends] = useState<string[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [userName, setUserName] = useState("박우빈님")

  const friends: Friend[] = [
    { id: "1", name: "김민수", maskedName: "김**", generation: "1기" },
    { id: "2", name: "이지연", maskedName: "이**", generation: "3기" },
    { id: "3", name: "박준호", maskedName: "박**", generation: "7기" },
    { id: "4", name: "최서연", maskedName: "최**", generation: "12기" },
    { id: "5", name: "정우진", maskedName: "정**", generation: "15기" },
    { id: "6", name: "한미래", maskedName: "한**", generation: "18기" },
    { id: "7", name: "송태양", maskedName: "송**", generation: "21기" },
  ]

  const toggleFriend = (friendId: string) => {
    setSelectedFriends((prev) => (prev.includes(friendId) ? prev.filter((id) => id !== friendId) : [...prev, friendId]))
  }

  const toggleAll = () => {
    if (selectedFriends.length === friends.length) {
      setSelectedFriends([])
    } else {
      setSelectedFriends(friends.map((friend) => friend.id))
    }
  }

  const handleSendMessage = () => {
    if (message.trim() === "") {
      toast({
        title: "메시지를 입력해주세요",
        variant: "destructive",
      })
      return
    }

    if (selectedFriends.length === 0) {
      toast({
        title: "최소 한 명의 친구를 선택해주세요",
        variant: "destructive",
      })
      return
    }

    const selectedNames = friends
      .filter((friend) => selectedFriends.includes(friend.id))
      .map((friend) => friend.name)
      .join(", ")

    toast({
      title: "메시지 전송 완료",
      description: `${selectedNames}님에게 메시지를 보냈습니다.`,
    })

    // Reset form
    setMessage("")
    setSelectedFriends([])
  }

  const handleKakaoLogin = () => {
    // In a real application, this would initiate the Kakao OAuth flow
    toast({
      title: "카카오 로그인",
      description: "카카오 로그인 프로세스가 시작되었습니다.",
    })

    // Simulate successful login
    setTimeout(() => {
      setIsLoggedIn(true)
      toast({
        title: "로그인 성공",
        description: "카카오 계정으로 로그인되었습니다.",
      })
    }, 1500)
  }

  return (
    <div className="container mx-auto py-10 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>대한학생회 해오름식 초대 메세지 발송</CardTitle>
          <CardDescription>명예의전팀에서 사용하는 자동 메시지 발송 API입니다.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-yellow-400 flex items-center justify-center">
                <span className="text-sm font-medium">박</span>
              </div>
              <span className="font-medium">{userName}</span>
            </div>
            <KakaoButton
              onClick={handleKakaoLogin}
              disabled={isLoggedIn}
              variant="outline"
              className="bg-transparent border-yellow-400 text-yellow-600 hover:bg-yellow-50"
            >
              {isLoggedIn ? "로그인됨" : "카카오 로그인"}
            </KakaoButton>
          </div>

          <Textarea
            placeholder="메시지를 입력하세요..."
            className="min-h-[120px]"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedFriends.length === friends.length && friends.length > 0}
                      onCheckedChange={toggleAll}
                      aria-label="전체 선택"
                    />
                  </TableHead>
                  <TableHead>이름</TableHead>
                  <TableHead>기수</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {friends.map((friend) => (
                  <TableRow key={friend.id}>
                    <TableCell>
                      <Checkbox
                        checked={selectedFriends.includes(friend.id)}
                        onCheckedChange={() => toggleFriend(friend.id)}
                        aria-label={`${friend.name} 선택`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{friend.maskedName}</TableCell>
                    <TableCell>{friend.generation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="ml-auto"
            onClick={handleSendMessage}
            disabled={!isLoggedIn}
            title={!isLoggedIn ? "로그인이 필요합니다" : ""}
          >
            <Send className="mr-2 h-4 w-4" />
            보내기 ({selectedFriends.length})
          </Button>
        </CardFooter>
      </Card>
      <Toaster />
    </div>
  )
}

