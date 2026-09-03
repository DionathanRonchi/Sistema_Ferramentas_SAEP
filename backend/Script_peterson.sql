-- =====================================================
-- CRIAÇÃO DO BANCO
-- =====================================================
CREATE SCHEMA IF NOT EXISTS `saep_db` DEFAULT CHARACTER SET utf8 ;
USE `saep_db` ;

-- -----------------------------------------------------
-- Tabela CATEGORIA
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saep_db`.`CATEGORIA` (
  `id_categoria` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id_categoria`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabela PRODUTO
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saep_db`.`PRODUTO` (
  `id_produto` INT NOT NULL AUTO_INCREMENT,
  `id_categoria` INT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `cor` VARCHAR(45) NULL,
  `textura` VARCHAR(45) NULL,
  `peso` DECIMAL(10,2) NOT NULL,
  `unidade_medida` VARCHAR(45) NOT NULL,
  `aplicacao` VARCHAR(100) NOT NULL,
  `data_validade` DATE NOT NULL,
  `estoque_minimo` INT NOT NULL,
  `estoque_atual` INT NOT NULL,
  `preco_unitario` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id_produto`),
  INDEX `fk_Produto_Categoria_idx` (`id_categoria` ASC) VISIBLE,
  CONSTRAINT `fk_Produto_Categoria`
    FOREIGN KEY (`id_categoria`)
    REFERENCES `saep_db`.`CATEGORIA` (`id_categoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabela USUARIO
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saep_db`.`USUARIO` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `login` VARCHAR(45) NOT NULL,
  `senha_hash` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Tabela MOVIMENTACAO_ESTOQUE
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `saep_db`.`MOVIMENTACAO_ESTOQUE` (
  `id_movimentacao` INT NOT NULL AUTO_INCREMENT,
  `id_produto` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  `tipo_movimentacao` VARCHAR(45) NOT NULL,
  `quantidade` INT NOT NULL,
  `data_movimentacao` DATETIME NOT NULL,
  PRIMARY KEY (`id_movimentacao`),
  INDEX `fk_Movimentacao_Produto_idx` (`id_produto` ASC) VISIBLE,
  INDEX `fk_Movimentacao_Usuario_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_Movimentacao_Produto`
    FOREIGN KEY (`id_produto`)
    REFERENCES `saep_db`.`PRODUTO` (`id_produto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Movimentacao_Usuario`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `saep_db`.`USUARIO` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- =====================================================
-- POPULAÇÃO DAS TABELAS
-- =====================================================

-- -----------------------------------------------------
-- CATEGORIA
-- -----------------------------------------------------
INSERT INTO `saep_db`.`CATEGORIA` (`nome`, `descricao`) VALUES
('Fundação', 'Materiais utilizados na base da construção'),
('Acabamento', 'Materiais utilizados na fase final da obra'),
('Estrutura', 'Materiais utilizados na estrutura da construção');

-- -----------------------------------------------------
-- PRODUTO
-- -----------------------------------------------------
INSERT INTO `saep_db`.`PRODUTO`
(`id_categoria`, `nome`, `cor`, `textura`, `peso`, `unidade_medida`, `aplicacao`, `data_validade`, `estoque_minimo`, `estoque_atual`, `preco_unitario`) VALUES
(3, 'Cimento CP II', 'Cinza', 'Fino', 50.00, 'kg', 'Estrutura', '2027-01-15', 20, 120, 32.90),
(2, 'Tinta Acrílica Branca', 'Branco', 'Fosca', 18.00, 'L', 'Acabamento', '2028-06-10', 10, 45, 189.90),
(1, 'Argamassa AC III', 'Cinza', 'Granulada', 20.00, 'kg', 'Fundação', '2027-03-20', 15, 8, 27.50);

-- -----------------------------------------------------
-- USUARIO
-- -----------------------------------------------------
INSERT INTO `saep_db`.`USUARIO` (`nome`, `login`, `senha_hash`) VALUES
('Ana Silva', 'ana.silva', 'senha123'),
('Carlos Souza', 'carlos.souza', 'senha456'),
('Mariana Costa', 'mariana.costa', 'senha789');

-- -----------------------------------------------------
-- MOVIMENTACAO_ESTOQUE
-- -----------------------------------------------------
INSERT INTO `saep_db`.`MOVIMENTACAO_ESTOQUE`
(`id_produto`, `id_usuario`, `tipo_movimentacao`, `quantidade`, `data_movimentacao`) VALUES
(1, 1, 'entrada', 200, '2026-07-01 09:30:00'),
(2, 2, 'saida', 5, '2026-07-10 14:15:00'),
(3, 3, 'saida', 12, '2026-08-15 11:00:00');
