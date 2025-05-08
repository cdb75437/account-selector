
import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { motion } from 'framer-motion'

export default function AccountSelector() {
  const [gender, setGender] = useState('')
  const [ageMin, setAgeMin] = useState('')
  const [ageMax, setAgeMax] = useState('')
  const [interest, setInterest] = useState('')
  const [account, setAccount] = useState(null)
  const [married, setMarried] = useState('')
  const [postUrl, setPostUrl] = useState('')
  const [note, setNote] = useState('')

  const apiBase = 'https://script.google.com/macros/s/AKfycbygkDeVjdJjZJuLHZuYAfHOGg_n_o3a6ISsTqn6Y64gVzrs8RK6OtIMBo0CsFPHB8_HEg/exec'

  const fetchAccount = async () => {
    const res = await fetch(`${apiBase}?gender=${gender}&ageMin=${ageMin}&ageMax=${ageMax}&interest=${interest}`)
    const data = await res.json()
    setAccount(data)
  }

  const submitUsage = async () => {
    await fetch(apiBase, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: account.id,
        married,
        postUrl,
        note
      })
    })
    alert('資料已更新')
    setAccount(null)
    setMarried('')
    setPostUrl('')
    setNote('')
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
        <h2 className="text-2xl font-bold mb-2">🎯 帳號搜尋</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>性別</Label>
            <Select onValueChange={setGender} value={gender}>
              <SelectTrigger><SelectValue placeholder="請選擇性別" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="男">男</SelectItem>
                <SelectItem value="女">女</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>興趣</Label>
            <Input value={interest} onChange={e => setInterest(e.target.value)} placeholder="例如：科技" />
          </div>
          <div>
            <Label>年齡下限</Label>
            <Input value={ageMin} onChange={e => setAgeMin(e.target.value)} type="number" />
          </div>
          <div>
            <Label>年齡上限</Label>
            <Input value={ageMax} onChange={e => setAgeMax(e.target.value)} type="number" />
          </div>
        </div>
        <Button onClick={fetchAccount}>搜尋帳號</Button>

        {account && (
          <Card className="mt-6">
            <CardContent className="space-y-4">
              <h3 className="text-xl font-semibold">🔎 搜尋結果</h3>
              <p><strong>帳號名稱：</strong>{account.name}</p>
              <p><strong>年齡：</strong>{account.age}</p>
              <p><strong>性別：</strong>{account.gender}</p>
              <p><strong>興趣：</strong>{account.interest}</p>
              <p><strong>人設：</strong>{account.persona}</p>

              <Label>是否已婚</Label>
              <Select onValueChange={setMarried} value={married}>
                <SelectTrigger><SelectValue placeholder="請選擇" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="是">是</SelectItem>
                  <SelectItem value="否">否</SelectItem>
                </SelectContent>
              </Select>

              <Label>發文網址</Label>
              <Input value={postUrl} onChange={e => setPostUrl(e.target.value)} placeholder="https://..." />

              <Label>備註</Label>
              <Textarea value={note} onChange={e => setNote(e.target.value)} />

              <Button onClick={submitUsage}>送出並更新</Button>
            </CardContent>
          </Card>
        )}
      </motion.div>
    </div>
  )
}
