#!/bin/bash

# 🚀 Script para Push no GitHub
# Execute após criar o repositório no GitHub

echo "🔄 Verificando configuração do Git..."
git config --list | grep user

echo "📋 Status do repositório..."
git status

echo "🔗 Conectando ao GitHub..."
git remote -v

echo "🚀 Fazendo push para o GitHub..."
git push -u origin main

echo "✅ Se não houve erros, seu código está no GitHub!"
echo "🌐 Acesse: https://github.com/cordeirotelecom/algoritmos-ordenacao-gamificados"

# Para deploy no Vercel:
echo ""
echo "📦 Próximo passo - Deploy no Vercel:"
echo "1. Acesse https://vercel.com"
echo "2. Faça login com GitHub"
echo "3. Importe o repositório algoritmos-ordenacao-gamificados"
echo "4. Configure como projeto estático (sem build)"
echo "5. Deploy automático será feito!"

read -p "Pressione Enter para continuar..."