# Student Performance - Design System

## 🎨 Visão Geral

Este documento descreve o design system implementado para o sistema Student Performance, um sistema web para gerenciamento de turmas e alunos com predição de performance usando Machine Learning.

## 🎯 Filosofia de Design

- **Minimalista**: Interface limpa com foco na funcionalidade
- **Profissional**: Visual adequado para educadores e administradores
- **Intuitivo**: Navegação clara e elementos familiares
- **Acessível**: Alto contraste e foco na usabilidade

## 🎨 Paleta de Cores

### Cores Primárias

- **Azul Primário**: `#4A90E2` - Botões principais, links e elementos ativos
- **Branco**: `#FFFFFF` - Fundo principal
- **Cinza Escuro**: `#333333` - Texto principal
- **Cinza Médio**: `#777777` - Texto secundário e labels

### Cores de Status

- **Sucesso (Aprovado)**: `#28A745` - Verde para aprovações
- **Atenção/Pendente**: `#FD7E14` - Laranja para status pendentes
- **Erro/Reprovado**: `#DC3545` - Vermelho para reprovações
- **Neutro**: `#6C757D` - Cinza para status neutros

### Cores de Fundo

- **Fundo Primário**: `#FFFFFF`
- **Fundo Secundário**: `#F8F9FA`
- **Fundo Terciário**: `#F5F5F5`

### Bordas

- **Borda Clara**: `#E0E0E0`
- **Borda Média**: `#D0D0D0`
- **Borda Escura**: `#B0B0B0`

## 🔤 Tipografia

### Fontes

- **Títulos**: Inter, Poppins (pesos Medium e SemiBold)
- **Corpo**: Roboto, Open Sans (pesos Regular e Light)

### Hierarquia

```css
h1: 3xl/4xl (48px/60px) - Títulos principais
h2: 2xl/3xl (36px/48px) - Títulos de seção
h3: xl/2xl (24px/36px) - Subtítulos
h4: lg/xl (20px/24px) - Títulos de cards
p: base (16px) - Texto de corpo
```

## 🧩 Componentes

### Botões

```tsx
// Botão Primário
<Button variant="default">Ação Principal</Button>

// Botão Secundário (Outline)
<Button variant="outline">Ação Secundária</Button>

// Botões de Status
<Button variant="success">Aprovar</Button>
<Button variant="warning">Atenção</Button>
<Button variant="destructive">Excluir</Button>

// Tamanhos
<Button size="sm">Pequeno</Button>
<Button size="default">Padrão</Button>
<Button size="lg">Grande</Button>
```

### Badges/Tags

```tsx
// Status de Alunos
<Badge variant="approved">Aprovado</Badge>
<Badge variant="failed">Reprovado</Badge>
<Badge variant="pending">Pendente</Badge>

// Outras variantes
<Badge variant="success">Sucesso</Badge>
<Badge variant="warning">Atenção</Badge>
<Badge variant="danger">Perigo</Badge>
<Badge variant="neutral">Neutro</Badge>
```

### Cards

```tsx
<Card className="hover:shadow-card-hover transition-shadow">
  <CardHeader>
    <CardTitle>Título do Card</CardTitle>
    <CardDescription>Descrição opcional</CardDescription>
  </CardHeader>
  <CardContent>Conteúdo do card</CardContent>
</Card>
```

### Formulários

```tsx
<div className="space-y-2">
  <Label htmlFor="campo">Nome do Campo</Label>
  <Input
    id="campo"
    placeholder="Placeholder..."
    className="focus:ring-primary focus:border-primary"
  />
</div>
```

## 📐 Espaçamento

### Sistema de Grid

- **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Seções**: `mb-8` (32px)
- **Cards**: `p-6` (24px)
- **Elementos**: `space-y-4` (16px)

### Shadows

- **Card**: `shadow-card`
- **Card Hover**: `shadow-card-hover`
- **Elevated**: `shadow-elevated`

## 🎭 Estados Interativos

### Hover

- **Botões**: Escurecem 10% (`hover:bg-primary/90`)
- **Cards**: Aumentam sombra (`hover:shadow-card-hover`)
- **Links**: Sublinhado (`hover:underline`)

### Focus

- **Inputs**: Ring azul (`focus:ring-primary`)
- **Botões**: Ring com offset (`focus:ring-2 focus:ring-offset-2`)

### Disabled

- **Opacidade**: 50% (`disabled:opacity-50`)
- **Cursor**: Não permitido (`disabled:cursor-not-allowed`)

## 📱 Responsividade

### Breakpoints

```css
sm: 640px   /* Tablet pequeno */
md: 768px   /* Tablet */
lg: 1024px  /* Laptop */
xl: 1280px  /* Desktop */
2xl: 1536px /* Desktop grande */
```

### Grid Responsivo

```tsx
// Cards de estatísticas
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

// Formulários
<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
```

## 🎯 Padrões de Uso

### Dashboard

- Header fixo com navegação
- Cards de estatísticas em grid
- Tabelas com hover states
- Botões de ação consistentes

### Formulários

- Labels acima dos campos
- Espaçamento consistente
- Estados de validação claros
- Botões de ação no final

### Tabelas

- Headers em negrito
- Zebra striping opcional
- Hover states nas linhas
- Botões de ação compactos

### Status Indicators

```tsx
// Para resultados de predição
{
  status === "approved" && <Badge variant="approved">Aprovado</Badge>;
}
{
  status === "failed" && <Badge variant="failed">Reprovado</Badge>;
}
{
  status === "pending" && <Badge variant="pending">Análise Pendente</Badge>;
}
```

## 🛠️ Classes Utilitárias Customizadas

### Textos

```css
.text-balance        /* Text wrap balance */
.animate-fade-in     /* Fade in animation */
.animate-slide-up    /* Slide up animation */
```

### Status

```css
.status-approved     /* Verde claro com texto verde escuro */
.status-failed       /* Vermelho claro com texto vermelho escuro */
.status-pending      /* Laranja claro com texto laranja escuro */
```

## 📋 Configuração Técnica

### Tailwind CSS 3.4

```js
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        /* cores customizadas */
      },
      fontFamily: {
        /* fontes customizadas */
      },
      boxShadow: {
        /* sombras customizadas */
      },
    },
  },
};
```

### PostCSS

```js
// postcss.config.js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## 🚀 Como Usar

1. **Importe os componentes**:

```tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
```

2. **Use as classes do sistema**:

```tsx
<div className="bg-bg-secondary text-text-primary font-body">
  <h1 className="text-3xl font-heading font-semibold">Título</h1>
  <p className="text-text-secondary">Descrição</p>
</div>
```

3. **Siga os padrões de layout**:

```tsx
<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div className="space-y-8">{/* Conteúdo */}</div>
</main>
```

## 📖 Exemplo Completo

Veja o arquivo `src/pages/DesignSystemDemo.tsx` para um exemplo completo de implementação do design system com todos os componentes e padrões em uso.

## 🎨 Preview

Para visualizar o design system em ação:

1. Execute `npm run dev`
2. Acesse `http://localhost:5173`
3. Navegue para a página de demonstração

---

**Desenvolvido com foco na experiência do usuário e facilidade de manutenção** 🎓
