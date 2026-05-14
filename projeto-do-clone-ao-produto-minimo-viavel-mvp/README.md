# 🎨 Morphix Studio: High-Fidelity Neumorphic Design System
 
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-black?style=for-the-badge&logo=framer&logoColor=white)
 
 
## 📝 Descrição do Projeto
O **Morphix Studio** é uma plataforma avançada de design iterativo focada na estética *Neumorphic* (Soft UI). O sistema permite que designers e desenvolvedores criem componentes de interface com profundidade fotorealista, calculando dinamicamente sombras complexas e gradientes baseados na luminância da cor de base selecionada.
 
Desenvolvido para oferecer uma experiência de personalização total, o dashboard processa variáveis críticas como **Raio de Borda**, **Intensidade de Sombra** e **Difusão de Blur**, utilizando um motor de renderização em tempo real que garante a integridade visual entre os estados *Flat*, *Concave*, *Convex* e *Pressed*.
 
 
---
![Preview do Morphix Studio](https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/public/og.png)
*Figura 1: Interface principal integrando painel de controle dinâmico e preview em tempo real.*
 
## 🚀 Tecnologias Utilizadas
* **Frontend:** React 19 + TypeScript + Vite
* **Estilização:** Tailwind CSS v4 (Arquitetura Utilitária de Alta Performance)
* **Backend & Auth:** Firebase (Google Authentication & Firestore Cloud Sync)
* **Motor de Design:** Algoritmos de luminância customizados para geração de sombras (Dark & Light shadows)
* **Animações:** Motion (Transições de layout e micro-interações fluidas)
* **Icons:** Lucide React (Biblioteca de vetores otimizada)
 
## 📊 Resultados e Funcionalidades
O projeto foi estruturado para garantir agilidade no fluxo de trabalho de UI/UX:
* **Motor de Preview Inteligente:** Renderização instantânea de mudanças paramétricas com interpolação suave via Motion core.
* **Persistência em Nuvem:** Integração nativa com Firestore para salvar e recuperar configurações de design vinculadas ao perfil do usuário.
* **Arquitetura Glassmorphism:** Interface de controle construída com efeitos de desfoque de fundo (Backdrop-filter) e bordas translúcidas de alta definição.
* **Controle de Superfície:** Algoritmos que validam se a cor de base suporta sombras negativas e positivas, garantindo o contraste necessário.
 
![Exemplo de Estilos](./image/image1.png)
*Figura 2: Demonstração dos quatro estados de superfície: Flat, Concave, Convex e Pressed.*
 
## 🔧 Como Executar
1. Clone o repositório.
2. Configure as credenciais do Firebase no arquivo `src/lib/firebase.ts`.
3. Certifique-se de que o domínio da sua aplicação está autorizado no console do Firebase (Auth Settings).
4. Instale as dependências: `npm install`.
5. Execute o servidor de desenvolvimento: `npm run dev`.
 
![Fluxo de Salvamento](./image/image1.png)
*Figura 3: Representação da sincronização de designs entre o cliente React e a base de dados distribuída.*
 
---
[Voltar ao início](#-morphix-studio-high-fidelity-neumorphic-design-system)
