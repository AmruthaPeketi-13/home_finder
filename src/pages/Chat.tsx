import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { MessageCircle, Send, Search, Phone, Video, MoreVertical } from 'lucide-react';
import { Input } from '@/components/ui/input';

const mockContacts = [
  { id: 1, name: 'Rahul Sharma', lastMessage: 'Is the property still available?', time: '2m ago', unread: 2, avatar: 'RS' },
  { id: 2, name: 'Priya Patel', lastMessage: 'Thank you for the information', time: '1h ago', unread: 0, avatar: 'PP' },
  { id: 3, name: 'Amit Kumar', lastMessage: 'Can we schedule a visit?', time: '3h ago', unread: 1, avatar: 'AK' },
];

const mockMessages = [
  { id: 1, sender: 'other', text: 'Hi, I saw your property listing. Is it still available?', time: '10:30 AM' },
  { id: 2, sender: 'me', text: 'Yes, the property is available. Would you like to schedule a visit?', time: '10:32 AM' },
  { id: 3, sender: 'other', text: 'That would be great! When is a good time?', time: '10:33 AM' },
  { id: 4, sender: 'me', text: 'How about this Saturday at 11 AM?', time: '10:35 AM' },
  { id: 5, sender: 'other', text: 'Perfect! Please share the exact address.', time: '10:36 AM' },
];

const ChatPage = () => {
  const [selectedContact, setSelectedContact] = useState(mockContacts[0]);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'me',
      text: newMessage,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })
    }]);
    setNewMessage('');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <motion.div
          className="glass-panel overflow-hidden h-[calc(100vh-180px)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex h-full">
            {/* Contacts Sidebar */}
            <div className="w-80 border-r border-border flex flex-col">
              <div className="p-4 border-b border-border">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle className="w-6 h-6 text-primary" />
                  <h2 className="text-xl font-display font-bold text-foreground">Messages</h2>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-10 h-10 bg-secondary/50"
                  />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                {mockContacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setSelectedContact(contact)}
                    className={`w-full p-4 flex items-center gap-3 hover:bg-secondary/50 transition-colors ${
                      selectedContact.id === contact.id ? 'bg-secondary/50' : ''
                    }`}
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                      {contact.avatar}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">{contact.name}</span>
                        <span className="text-xs text-muted-foreground">{contact.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                    </div>
                    {contact.unread > 0 && (
                      <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-xs text-primary-foreground font-medium">
                        {contact.unread}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                    {selectedContact.avatar}
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{selectedContact.name}</h3>
                    <p className="text-xs text-muted-foreground">Property Owner</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
                    <Phone className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div
                      className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                        message.sender === 'me'
                          ? 'bg-primary text-primary-foreground rounded-br-sm'
                          : 'bg-secondary text-foreground rounded-bl-sm'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'me' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                      }`}>
                        {message.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-border">
                <div className="flex items-center gap-3">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    className="flex-1 h-12 bg-secondary/50"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="w-12 h-12 rounded-xl btn-gradient-primary flex items-center justify-center glow-primary"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ChatPage;
