class ChatInterface {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.querySelector('.chat-input input');
        this.sendButton = document.querySelector('.chat-input button');
        
        // Groq API Configuration
        this.apiConfig = {
            endpoint: 'https://api.groq.com/openai/v1/chat/completions',
            apiKey: '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', // Replace with your Groq API key
            model: 'mixtral-8x7b-32768' // Groq's Mixtral model
        };

        this.setupEventListeners();
    }

    setupEventListeners() {
        this.sendButton.addEventListener('click', () => this.handleSendMessage());
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSendMessage();
            }
        });
    }

    async handleSendMessage() {
        const message = this.chatInput.value.trim();
        if (!message) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        this.chatInput.value = '';

        try {
            // Show loading state
            this.addMessage('Thinking...', 'ai', true);
            
            // Get AI response
            const response = await this.getAIResponse(message);
            
            // Remove loading message and add actual response
            this.removeLastMessage();
            this.addMessage(response, 'ai');
        } catch (error) {
            console.error('Error getting AI response:', error);
            this.removeLastMessage();
            this.addMessage('Sorry, I encountered an error. Please try again.', 'ai');
        }
    }

    addMessage(text, type, isTemporary = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}`;
        messageDiv.textContent = text;
        if (isTemporary) messageDiv.classList.add('temporary');
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }

    removeLastMessage() {
        const messages = this.chatMessages.querySelectorAll('.message');
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.classList.contains('temporary')) {
            lastMessage.remove();
        }
    }

    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    async getAIResponse(message) {
        const response = await fetch(this.apiConfig.endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiConfig.apiKey}`
            },
            body: JSON.stringify({
                model: this.apiConfig.model,
                messages: [
                    {
                        role: 'system',
                        content: 'You are a helpful AI assistant for Hustl, a decentralized marketplace. Help users find services or products they need. Be concise and direct in your responses.'
                    },
                    {
                        role: 'user',
                        content: message
                    }
                ],
                temperature: 0.7,
                max_tokens: 500,
                stream: false
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error?.message || 'Groq API request failed');
        }

        const data = await response.json();
        return data.choices[0].message.content;
    }
}

// Initialize chat interface when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const chat = new ChatInterface();
}); 