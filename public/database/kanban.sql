-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 02/10/2024 às 01:27
-- Versão do servidor: 10.4.32-MariaDB
-- Versão do PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `kanban`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Desenvolvimento'),
(2, 'Marketing'),
(3, 'Design'),
(4, 'Infraestrutura');

-- --------------------------------------------------------

--
-- Estrutura para tabela `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `role_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `roles`
--

INSERT INTO `roles` (`id`, `role_name`) VALUES
(1, 'Admin'),
(2, 'User');

-- --------------------------------------------------------

--
-- Estrutura para tabela `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `due_date` date DEFAULT NULL,
  `status` varchar(50) DEFAULT 'pending',
  `priority` varchar(50) DEFAULT 'medium',
  `file_path` varchar(255) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `task_list_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `created_at`, `due_date`, `status`, `priority`, `file_path`, `user_id`, `category_id`, `task_list_id`) VALUES
(1, 'Desenvolver feature Rápidoooo', 'Podem acelerar isto?', '2024-09-17 00:51:18', '2024-09-02', 'pending', 'medium', '/uploads/featureX.pdf', 1, 1, 2),
(2, 'Campanha de Email Marketing', 'Criar conteúdo e design para campanha.', '2024-09-17 00:51:18', '2024-09-20', 'in_progress', 'medium', NULL, 1, 2, 2),
(3, 'Atualizar site, só isso', 'Atualizar layout da página inicial.', '2024-09-17 00:51:18', '2024-09-25', 'pending', 'high', '/uploads/layout.png', 3, 3, 1),
(4, 'Backup do Servidor', 'Configurar backup diário no servidor de produção.', '2024-09-17 00:51:18', '2024-09-30', 'pending', 'high', NULL, 1, 4, 3),
(7, 'Concertara a impressora MITSUBISHI', 'Não esta imprimindo a cor. Não deêm urgência. Foi mal', '2024-09-22 02:04:37', '2024-10-11', 'pending', 'high', '1727052626470-Curriculum Professor de Espanhol.pdf', 3, 2, 3),
(10, 'Análise dos usuários', 'No power BI temos um erro. Poderiam verificar porfavor?', '2024-09-28 03:14:19', '2024-12-30', 'pending', 'low', '1727493259777-ApresentaÃ§Ã£o dos Data Buddies.pdf', 11, 2, 3),
(12, 'Redimensão de imagem esa', 'Solicito que seja feito uma redimensão desta imagem', '2024-09-28 04:05:23', '2025-02-15', 'pending', 'high', NULL, 15, 4, 3),
(15, 'Esperando o salario', 'Não chegou o salario', '2024-09-28 17:34:46', '2024-10-16', 'pending', 'medium', '1727544886141-iconSite.png', 13, 1, 3),
(22, 'Tenemos queda do sistema', 'No power BI temos um erro. Poderiam verificar porfavor?', '2024-09-28 20:18:36', '2024-12-30', 'pending', 'low', '1727554716635-ApresentaÃ§Ã£o dos Data Buddies.pdf', 11, 2, 1),
(23, 'Tenho fome, ainda não trazem a pizza para a janta!', 'O product owner disse que traria pizza para a gente, cadê?', '2024-09-28 22:17:40', '2024-09-28', 'pending', 'high', NULL, 11, 1, 1),
(28, 'Ficamos sem Café desde 01/10/2024', 'Até agora não trouxeram café e a chaleiro quebrou', '2024-09-29 07:46:54', '2024-10-12', 'pending', 'high', NULL, 14, 3, 3),
(29, 'Criar um chat', 'Precisamos implementar um dashboard mais intuitivo em tempo real', '2024-09-29 07:50:28', '2024-12-10', 'pending', 'low', NULL, 1, 1, 3),
(30, 'Entrou uma rã na cozinha', 'Pessoal, não entrem na cozinha, esta vindo proteção animal. Peço que peguem agua do banheiro', '2024-09-29 15:38:13', '2024-09-10', 'pending', 'high', NULL, 13, 4, 3),
(31, 'Não temos água e nem café', 'Acabou a água no andar 2', '2024-09-29 21:19:22', '2024-10-01', 'pending', 'high', NULL, 16, 4, 3),
(32, 'Financeiro tem algum retorno?', 'Ainda não temos o salário', '2024-09-30 02:19:27', '2024-10-04', 'pending', 'medium', '1727667416365-Daenerys Targaryen.png', 9, 3, 3),
(33, 'Scrum Master', 'Análise da semana ', '2024-09-30 02:36:46', '2024-10-09', 'pending', 'low', NULL, 18, 1, 3),
(34, 'Não caiu o salario pela segunda vez', 'João se queixou e foi embora do local', '2024-10-01 13:29:33', '2024-10-23', 'pending', 'medium', NULL, 1, 1, 3),
(38, 'Cria ao usuário Elon Musk', 'Ele será nosso novo sócio. Precisa de urgência esta tarefa ser realizada', '2024-10-01 21:25:50', '2024-10-07', 'pending', 'high', NULL, 14, 1, 3),
(47, 'Desenvolver API: gerar imagens estáticas', 'Possuimos um problema grande de não ter um endpoint por parte do backend para servir algo no frontend. Para isto precisamos possuir uma imagem carregada.', '2024-10-01 22:30:26', '2024-10-02', 'pending', 'medium', '1727821825959-lokiReal.png', 17, 3, 2),
(48, 'Falha no componente Header.jsx', 'Developers, poderiam verificar esta parte por favor?', '2024-10-01 22:50:03', '2024-10-09', 'pending', 'high', '1727823003607-Daenerys Targaryen.png', 1, 1, 2);

-- --------------------------------------------------------

--
-- Estrutura para tabela `task_comments`
--

CREATE TABLE `task_comments` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `task_comments`
--

INSERT INTO `task_comments` (`id`, `task_id`, `user_id`, `comment`, `created_at`) VALUES
(1, 1, 2, 'Precisamos discutir os requisitos desta feature antes de iniciar.', '2024-09-17 00:51:18'),
(2, 2, 1, 'Já comecei o design da campanha.', '2024-09-17 00:51:18'),
(3, 3, 3, 'Preciso de ajuda com o novo layout.', '2024-09-17 00:51:18'),
(4, 1, 2, 'Este é um comentário', '2024-09-25 03:19:48'),
(5, 1, 2, 'Este é um comentário', '2024-09-25 03:19:55'),
(7, 1, 2, 'Esta bacan', '2024-09-25 03:42:24');

-- --------------------------------------------------------

--
-- Estrutura para tabela `task_history`
--

CREATE TABLE `task_history` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `changed_by` int(11) NOT NULL,
  `change_description` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `task_history`
--

INSERT INTO `task_history` (`id`, `task_id`, `changed_by`, `change_description`, `created_at`) VALUES
(1, 1, 1, 'Mudança no prazo da tarefa para 2024-09-15', '2024-09-17 00:51:18'),
(2, 2, 2, 'Alterado status da tarefa para em progresso', '2024-09-17 00:51:18'),
(3, 4, 1, 'Mudança de prioridade para alta', '2024-09-17 00:51:18'),
(4, 7, 12, 'Título alterado de \'Concertara a impressora SAMSUNG\' para \'Concertara a impressora MITSUBISHI\', Data de vencimento alterada de \'Fri Oct 11 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-10-11\'', '2024-09-22 04:46:26'),
(5, 7, 11, 'Data de vencimento alterada de \'Fri Oct 11 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-10-11\', Arquivo alterado de \'1727051601138-Curriculum Professor de Espanhol.pdf\' para \'undefined\', Categoria alterada de \'undefined\' para \'Marketing\', Lista de tarea alterada de \'undefined\' para \'Em progresso\'', '2024-09-23 00:35:02'),
(6, 7, 1, 'Data de vencimento alterada de \'Fri Oct 11 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-10-11\', Arquivo alterado de \'1727051701746-Curriculum Professor de Espanhol.pdf\' para \'undefined\', Usuário responsável alterado de \'undefined\' para \'Carlos Lima\', Categoria alterada de \'undefined\' para \'Marketing\', Lista de tarea alterada de \'undefined\' para \'Em progresso\'', '2024-09-23 00:50:26'),
(7, 1, 11, 'Data de vencimento alterada de \'Sun Sep 15 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-09-15T03:00:00.000Z\', Arquivo alterado de \'/uploads/featureX.pdf\' para \'undefined\'', '2024-09-28 22:35:51'),
(8, 1, 11, 'Data de vencimento alterada de \'Sun Sep 15 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-09-15T03:00:00.000Z\', Arquivo alterado de \'/uploads/featureX.pdf\' para \'undefined\'', '2024-09-28 22:36:23'),
(9, 1, 11, 'Data de vencimento alterada de \'Sun Sep 15 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-09-15T03:00:00.000Z\', Arquivo alterado de \'/uploads/featureX.pdf\' para \'undefined\'', '2024-09-28 22:49:08'),
(10, 1, 11, 'Data de vencimento alterada de \'Sun Sep 15 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-09-15T03:00:00.000Z\', Arquivo alterado de \'/uploads/featureX.pdf\' para \'undefined\'', '2024-09-28 22:51:23'),
(11, 3, 11, 'Título alterado de \'Atualizar site\' para \'Atualizar site, só isso\', Data de vencimento alterada de \'Wed Sep 25 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-09-25T03:00:00.000Z\', Arquivo alterado de \'/uploads/layout.png\' para \'undefined\'', '2024-09-28 23:03:23'),
(12, 1, 11, 'Descrição alterada de \'Implementar a feature X no sistema.\' para \'Podem acelerar isto?\', Data de vencimento alterada de \'Sun Sep 15 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-09-15T03:00:00.000Z\', Arquivo alterado de \'/uploads/featureX.pdf\' para \'undefined\'', '2024-09-28 23:04:39'),
(13, 1, 11, 'Título alterado de \'Desenvolver feature X\' para \'Desenvolver feature yuluyl\', Data de vencimento alterada de \'Sun Sep 15 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-09-15T03:00:00.000Z\', Arquivo alterado de \'/uploads/featureX.pdf\' para \'undefined\'', '2024-09-28 23:18:47'),
(14, 1, 11, 'Título alterado de \'Desenvolver feature yuluyl\' para \'Desenvolver feature Rápidoooo\', Data de vencimento alterada de \'Sun Sep 15 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-09-15T03:00:00.000Z\', Arquivo alterado de \'/uploads/featureX.pdf\' para \'undefined\'', '2024-09-28 23:19:24'),
(15, 31, 11, 'Data de vencimento alterada de \'Tue Oct 01 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-10-01T03:00:00.000Z\', Arquivo alterado de \'null\' para \'undefined\'', '2024-09-29 21:20:06'),
(16, 31, 3, 'Data de vencimento alterada de \'Tue Oct 01 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-10-01T03:00:00.000Z\', Arquivo alterado de \'null\' para \'undefined\', Lista de tarea alterada de \'Para fazer\' para \'Concluído\'', '2024-09-29 23:26:15'),
(17, 31, 3, 'Data de vencimento alterada de \'Tue Oct 01 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-10-01T03:00:00.000Z\', Arquivo alterado de \'null\' para \'undefined\', Lista de tarea alterada de \'Concluído\' para \'Para Fazer\'', '2024-09-29 23:26:29'),
(18, 31, 3, 'Data de vencimento alterada de \'Tue Oct 01 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-10-01T03:00:00.000Z\', Arquivo alterado de \'null\' para \'undefined\', Lista de tarea alterada de \'Para fazer\' para \'Concluído\'', '2024-09-29 23:26:36'),
(19, 32, 3, 'Data de vencimento alterada de \'Fri Oct 04 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-10-04T03:00:00.000Z\', Prioridade alterada de \'high\' para \'medium\', Arquivo alterado de \'1727662767083-carlos-lima.jpg\' para \'undefined\'', '2024-09-30 03:29:57'),
(20, 32, 3, 'Data de vencimento alterada de \'Fri Oct 04 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-10-04T03:00:00.000Z\', Arquivo alterado de \'1727662767083-carlos-lima.jpg\' para \'undefined\'', '2024-09-30 03:36:56'),
(21, 2, 3, 'Data de vencimento alterada de \'Fri Sep 20 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-09-20T03:00:00.000Z\', Arquivo alterado de \'null\' para \'undefined\', Usuário responsável alterado de \'Jeniffer Lawrence\' para \'João da Silva\'', '2024-09-30 04:57:14'),
(22, 1, 1, 'Data de vencimento alterada de \'Sun Sep 15 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-09-02\', Prioridade alterada de \'high\' para \'medium\', Arquivo alterado de \'/uploads/featureX.pdf\' para \'undefined\', Lista de tarea alterada de \'Para fazer\' para \'Em Progresso\'', '2024-10-01 05:20:58'),
(23, 3, 3, 'Título alterado de \'Atualizar site, só isso\' para \'Atualizar site, só \', Data de vencimento alterada de \'Wed Sep 25 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-09-25T03:00:00.000Z\', Arquivo alterado de \'/uploads/layout.png\' para \'undefined\'', '2024-10-01 05:50:18'),
(24, 12, 19, 'Título alterado de \'Redimensão de imagem\' para \'Redimensão de imagem esa\', Data de vencimento alterada de \'Sat Feb 15 2025 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2025-02-15T03:00:00.000Z\', Arquivo alterado de \'null\' para \'undefined\'', '2024-10-01 21:31:41'),
(25, 3, 19, 'Título alterado de \'Atualizar site, só \' para \'Atualizar site, só isso\', Data de vencimento alterada de \'Wed Sep 25 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-09-25T03:00:00.000Z\', Arquivo alterado de \'/uploads/layout.png\' para \'undefined\'', '2024-10-01 21:44:24'),
(29, 47, 19, 'Título alterado de \'Desenvolver API para gerar imagens estáticas\' para \'Desenvolver API: gerar imagens estáticas\', Data de vencimento alterada de \'Wed Oct 02 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-10-02T03:00:00.000Z\', Arquivo alterado de \'1727821825959-lokiReal.png\' para \'undefined\'', '2024-10-01 22:30:42'),
(30, 47, 19, 'Data de vencimento alterada de \'Wed Oct 02 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-10-02T03:00:00.000Z\', Arquivo alterado de \'1727821825959-lokiReal.png\' para \'undefined\'', '2024-10-01 22:47:53'),
(31, 47, 19, 'Data de vencimento alterada de \'Wed Oct 02 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-10-02T03:00:00.000Z\', Arquivo alterado de \'1727821825959-lokiReal.png\' para \'undefined\'', '2024-10-01 22:48:06'),
(32, 47, 19, 'Data de vencimento alterada de \'Wed Oct 02 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-10-02T03:00:00.000Z\', Arquivo alterado de \'1727821825959-lokiReal.png\' para \'undefined\', Lista de tarea alterada de \'Em progresso\' para \'Em Progresso\'', '2024-10-01 22:48:23'),
(33, 4, 19, 'Data de vencimento alterada de \'Mon Sep 30 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-09-30T03:00:00.000Z\', Arquivo alterado de \'null\' para \'undefined\', Lista de tarea alterada de \'Para fazer\' para \'Concluído\'', '2024-10-01 22:48:38'),
(34, 48, 19, 'Data de vencimento alterada de \'Wed Oct 09 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-10-09T03:00:00.000Z\', Arquivo alterado de \'1727823003607-Daenerys Targaryen.png\' para \'undefined\'', '2024-10-01 22:50:09'),
(35, 3, 1, 'Data de vencimento alterada de \'Wed Sep 25 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-09-25T03:00:00.000Z\', Prioridade alterada de \'low\' para \'high\', Arquivo alterado de \'/uploads/layout.png\' para \'undefined\'', '2024-10-01 23:14:18'),
(36, 7, 1, 'Data de vencimento alterada de \'Fri Oct 11 2024 00:00:00 GMT-0300 (hora estándar de Brasilia)\' para \'2024-10-11T03:00:00.000Z\', Arquivo alterado de \'1727052626470-Curriculum Professor de Espanhol.pdf\' para \'undefined\', Lista de tarea alterada de \'Em progresso\' para \'Concluído\'', '2024-10-01 23:15:34');

-- --------------------------------------------------------

--
-- Estrutura para tabela `task_lists`
--

CREATE TABLE `task_lists` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `task_lists`
--

INSERT INTO `task_lists` (`id`, `name`) VALUES
(1, 'Para fazer'),
(2, 'Em progresso'),
(3, 'Concluído');

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `description` varchar(200) DEFAULT NULL,
  `job_title` varchar(100) DEFAULT NULL,
  `role_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_photo` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `description`, `job_title`, `role_id`, `created_at`, `user_photo`) VALUES
(1, 'João da Silva Andres', 'joaoda.silva@gmail.com', 'Líder de desenvolvimento backend', 'Developer', 2, '2024-09-17 00:51:18', '1727823801291-bilbo.png'),
(2, 'Jeniffer Lawrence', 'jeniffer@gmail.com', 'Arqueira desde criança', 'Designer UX/UI', 2, '2024-09-17 00:51:18', '1727404668495-jenifer.png'),
(3, 'Carlos Lima', 'carlos.lima@hotmail.com', 'Gerencia o design dos produtos de beleza', 'Designer UX/UI', 2, '2024-09-17 00:51:18', '1727761912903-carlos-lima.jpg'),
(9, 'Francisco Lima', 'francisoLima@gmail.com', 'I like to eat coffe', 'Developer', 1, '2024-09-19 19:14:12', '1726773311511-francis.jpg'),
(11, 'Hyrum Spencer', 'hyrum@gmail.com', 'Peruano de nascença', 'Developer', 2, '2024-09-22 01:29:22', '1727397279385-Captura de pantalla 2024-09-03 184807.png'),
(12, 'Barrabás', 'barrabas@gmail.com', 'Com mais de 20 anos de experiência', 'Product Manager', 2, '2024-09-22 01:44:54', '1726969494839-protagonista.png'),
(13, 'Milla Jovovich', 'milla@gmail.com', 'Seria en lo que hago', 'Recursos Humanos', 2, '2024-09-27 03:31:40', '1727407900112-milla.png'),
(14, 'Samuel Jackson', 'samuel@gmail.com', 'Psicologo da empresa', 'Recursos Humanos', 2, '2024-09-27 03:33:22', '1727408002696-neal.jpg'),
(15, 'Mao Zedong', 'mao@gmail.com', 'Somente python', 'Developer', 2, '2024-09-27 03:34:33', '1727408073251-mao.png'),
(16, 'Bilbo Bolson', 'bilbo@gmail.com', 'Somente python', 'Data Scientist', 2, '2024-09-29 16:30:48', '1727627448437-bilbo.png'),
(17, 'Loki Laufeyso', 'loki@gmail.com', 'Faço desenhos e criou realidades', 'Designer UX/UI', 2, '2024-09-29 16:35:13', '1727635226069-lokiReal.png'),
(18, 'John Wick', 'john@gmail.com', 'Fundador da empresa. Atirador aposentado ', 'Chief Executive Officer', 1, '2024-09-29 16:49:10', '1727628550534-keanu.webp'),
(19, 'Chao Ling Fu', 'chao@gmail.com', 'Vice-Presidente da empresa. Colega de John. Lutador aposentado', 'Vice-president', 1, '2024-09-29 16:52:50', '1727817807927-chao.png'),
(20, 'Daenerys Targaryen', 'daenerys@gmail.com', 'Analista de dados atualmente. Já tive trabalhos anteriores como domadora de dragões', 'Data Scientist', 2, '2024-09-29 16:57:55', '1727629075651-Daenerys Targaryen.png');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `category_id` (`category_id`),
  ADD KEY `task_list_id` (`task_list_id`);

--
-- Índices de tabela `task_comments`
--
ALTER TABLE `task_comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_id` (`task_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Índices de tabela `task_history`
--
ALTER TABLE `task_history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_id` (`task_id`),
  ADD KEY `changed_by` (`changed_by`);

--
-- Índices de tabela `task_lists`
--
ALTER TABLE `task_lists`
  ADD PRIMARY KEY (`id`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `role_id` (`role_id`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de tabela `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT de tabela `task_comments`
--
ALTER TABLE `task_comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `task_history`
--
ALTER TABLE `task_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT de tabela `task_lists`
--
ALTER TABLE `task_lists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `tasks_ibfk_3` FOREIGN KEY (`task_list_id`) REFERENCES `task_lists` (`id`);

--
-- Restrições para tabelas `task_comments`
--
ALTER TABLE `task_comments`
  ADD CONSTRAINT `task_comments_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`),
  ADD CONSTRAINT `task_comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Restrições para tabelas `task_history`
--
ALTER TABLE `task_history`
  ADD CONSTRAINT `task_history_ibfk_1` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`id`),
  ADD CONSTRAINT `task_history_ibfk_2` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`);

--
-- Restrições para tabelas `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
