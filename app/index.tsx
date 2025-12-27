import React, { useState, useEffect, useMemo, useRef } from "react";
import { createRoot } from "react-dom/client";
import { 
  Calculator, 
  Cpu, 
  Database, 
  BookOpen, 
  Settings, 
  ChevronRight, 
  Binary, 
  TrendingUp,
  LayoutDashboard,
  Edit3,
  Eye,
  Menu,
  X,
  PanelRightOpen,
  PanelRightClose,
  ArrowRight,
  Activity,
  Layers,
  HardDrive,
  FileCode,
  ArrowDown,
  MousePointerClick,
  ArrowLeftRight,
  ArrowLeft,
  ChevronsRight,
  MoveHorizontal,
  List,
  Anchor,
  MapPin,
  AlertTriangle,
  Play,
  RotateCcw,
  FastForward,
  GitBranch,
  Zap,
  ShieldAlert,
  Network,
  Share2,
  Disc,
  Clock,
  Check,
  RefreshCw,
  Table as TableIcon,
  FileDigit
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// --- Constants ---

const USER_DOCUMENT = `# 计算机组织结构期末复习指南 (全集)

## 目录与分值分布 (Total: ~25分)

1. **计算机系统概述** (约 5分)  
   * *题型预测：选择题、简答题、计算题(CPU时间/Amdahl)*  
2. **数据的机器级表示** (约 10分)  
   * *题型预测：选择题、填空题、计算题(IEEE754转换/补码范围)*  
3. **运算方法和运算部件** (约 10分)  
   * *题型预测：选择题(标志位判断)、计算题(补码加减/溢出)*
4. **指令系统** (约 15分)
5. **中央处理器** (约 15分)
6. **指令流水线** (约 15分)
7. **存储器层次结构** (约 20分)
8. **系统互联及输入输出组织** (约 10分)

---

# 第一部分：计算机系统概述 (约 5分)

### 1. 核心考点与答案

* **计算机硬件的基本组成?**  
  * **冯·诺依曼结构五大部件**：运算器、控制器、存储器、输入设备、输出设备。  
  * **现代计算机核心**：CPU (运算器+控制器+寄存器) + 主存 + 总线 + I/O设备。  
* **计算机软件的分类?**  
  * **系统软件**：操作系统 (OS)、语言处理程序 (编译器/汇编器)、数据库管理系统 (DBMS)。用于管理硬件和支持应用。  
  * **应用软件**：为特定任务编写的程序 (如视频播放器、Office)。  
* **计算机系统的抽象层及其转换?**  
  * **层次**：应用 $\\to$ 算法 $\\to$ 编程语言 $\\to$ OS/虚拟机 $\\to$ **ISA (指令集体系结构)** $\\to$ 微体系结构 $\\to$ 硬件电路。  
  * **关键**：**ISA** 是软硬件的接口 (Interface)。  
  * **转换**：源程序(.c) $\\xrightarrow{预处理}$ .i $\\xrightarrow{编译}$ .s (汇编) $\\xrightarrow{汇编}$ .o (机器码) $\\xrightarrow{链接}$ 可执行文件。  
* **用户CPU时间计算?** (★重点计算)  
  * 公式：

    $$
    \\text{用户CPU时间} = \\frac{\\text{程序总时钟周期数}}{\\text{时钟频率}}
    $$
    $$
    = \\text{指令条数(IC)} \\times \\text{CPI} \\times \\text{时钟周期}
    $$

  * **CPI (Cycles Per Instruction)**：执行每条指令所需的平均时钟周期数。  
* **Amdahl定律?** (★重点计算)  
  * 用于计算系统某部分改进后的整体加速比。  
  * 公式：

    $$
    \\text{加速比} = \\frac{1}{(1-f) + \\frac{f}{S}}
    $$  

  * $f$：可改进部分占总时间的比例。  
  * $S$：改进部分性能提高的倍数。  
  * **结论**：系统加速比受限于不可改进部分 ($1-f$)，即使 $S \\to \\infty$，加速比极限为 $1/(1-f)$。

### 2. 典型例题

* **CPU时间**：已知 A 机频率 400MHz，运行需 10s。设计 B 机运行需 6s，但周期数增加 1.2 倍。求 B 机频率？  
  * $Cycle\\_A = 10 \\times 400M = 4000M$  
  * $Cycle\\_B = 1.2 \\times 4000M = 4800M$  
  * $Freq\\_B = 4800M / 6s = 800MHz$。

---

# 第二部分：数据的机器级表示 (约 10分)

### 1. 核心考点与答案

* **数制转换 (二/八/十/十六)?**  
  * **二 $\\to$ 十六**：4位一组 (1011 0101 $\\to$ B5)。  
  * **十 $\\to$ R**：整数除基取余 (上低下高)，小数乘基取整 (上高下低)。  
* **整数表示 (原码/补码/移码)?**  
  * **补码 (Two's Complement)**：正数不变；负数**取反加1**。  
  * **移码**：补码符号位取反 (用于浮点数阶码，方便比较大小)。  
* **无符号与带符号整数?**  
  * **范围 (n位)**：  
    * 无符号：$0 \\sim 2^n - 1$。  
    * 补码：$-2^{n-1} \\sim 2^{n-1} - 1$ (注意最小负数无对应原码)。  
  * **转换**：机器码不变，解释方式不同。  
* **浮点数表示 (IEEE 754)?** (★重点计算)  
  * **公式**：$V = (-1)^S \\times 1.M \\times 2^{E - Bias}$  
  * **参数**：  
    * **单精度 (32位)**：S(1) + E(8) + M(23)。Bias = 127。  
    * **双精度 (64位)**：S(1) + E(11) + M(52)。Bias = 1023。  
  * **阶码 E**：全0为非规格化数 (0或极小)，全1为 $\\infty$ 或 NaN。  
* **数据的存储和排列顺序?**  
  * **大端 (Big Endian)**：高位存低地址 (MSB First)。  
  * **小端 (Little Endian)**：低位存低地址 (LSB First, Intel x86用此方式)。  
  * **对齐**：int (4字节) 地址应能被 4 整除，否则可能触发异常或降低效率。

### 2. 典型例题

* **十六进制转浮点**：C0A00000H 是多少？  
  * 二进制：1 10000001 01000...  
  * S=1 (负)。E=129 (真值 $129-127=2$)。M=.01 (真值 $1.25$)。  
  * 值 = $-1.25 \\times 2^2 = -5.0$。  
  * **大端小端**：0x12345678 存入地址 0，机器是小端。问地址 0 存什么？  
  * 答案：0x78 (最低位)。

---

# 第三部分：运算方法和运算部件 (约 10分)

### 1. 核心考点与答案

* **常见的 MIPS 汇编指令?**  
  * **算术运算**：  
    * \`add $t0, $s1, $s2\` (带符号加，溢出报错)  
    * \`addu $t0, $s1, $s2\` (无符号加，**不**报溢出)  
    * \`sub $t0, $s1, $s2\` 
    * \`addi $t0, $s1, 10\` (立即数加)  
  * **逻辑运算**：  
    * \`and $t0, $s1, $s2\` (按位与，用于掩码)  
    * \`or $t0, $s1, $s2\` (按位或，用于置位)  
    * \`nor $t0, $s1, $s2\` (按位或非，用于取反 nor $t0, $s1, $zero)  
  * **移位运算**：  
    * \`sll $t0, $s1, 2\` (逻辑左移，低位补0)  
    * \`srl $t0, $s1, 2\` (逻辑右移，高位补0)  
    * \`sra $t0, $s1, 2\` (算术右移，高位补**符号位**)  
* **加法器原理?**  
  * **串行进位**：延迟高，随位数线性增加。  
  * **并行进位 (CLA)**：利用生成项 ($G$) 和传递项 ($P$) 提前计算进位，速度快。  
  * **ALU 标志位**：  
    * **ZF** (结果为0)  
    * **OF** (带符号溢出：$C\\_n \\oplus C\\_{n-1}$)  
    * **CF** (无符号进位/借位：$C\\_{out} \\oplus C\\_{in}$)  
    * **SF** (结果符号：最高位)  
* **补码加减运算与溢出?** (★重点)  
  * **公式**：$[A-B]_{\\text{补}} = [A]_{\\text{补}} + [-B]_{\\text{补}}$。  
  * **溢出判断**：  
    * **方法1**：最高位进位 $\\ne$ 次高位进位 ($C\\_n \\oplus C\\_{n-1} = 1$)。  
    * **方法2**：双符号位 (01正溢出，10负溢出)。  
* **浮点数加减运算?**  
  * **步骤**：**对阶** (小阶看齐大阶) $\\to$ **尾数加减** $\\to$ **规格化** (左规/右规) $\\to$ **舍入** $\\to$ **溢出判断**。  
  * **精度损失**：主要发生在对阶(右移)和舍入时。

### 2. 典型例题

* **补码加法溢出**：8位补码 10000000 + 10000000 (-128 + -128)  
  * 结果 1 00000000 (9位)。  
  * 8位截断后为 00000000 (0)。  
  * $C\\_n=1$ (符号位进位), $C\\_{n-1}=0$ (数值最高位无进位)。  
  * $OF = 1 \\oplus 0 = 1$ (溢出)。  
* **常量乘法**：计算 x * 10。  
  * MIPS指令思路：sll $t0, $s0, 3 ($x \\times 8$) $\\to$ sll $t1, $s0, 1 ($x \\times 2$) $\\to$ add $t0, $t0, $t1。

---

# 第四部分：指令系统 (约15分)

## 一、 考试重点与题型预测

根据《总复习》大纲，本章考查重点包括：

1. **指令的组成**：操作码（OP）+ 操作数地址。  
2. **MIPS 三种指令格式**：R型、I型、J型的字段划分及位宽。  
3. **寻址方式**：立即数寻址、寄存器寻址、基址寻址、PC 相对寻址、伪直接寻址。  
4. **C 语言结构的汇编表示**：if-else、while/for 循环的实现。  
5. **过程调用 (Function Call)**：栈（Stack）的变化、寄存器使用约定（$a0-$a3, $v0-$v1, $ra, $sp）。

---

**二、 核心知识点详解**

### 1. MIPS 指令格式 (必考)

MIPS 指令长度固定为 **32位**，分为三种格式：

| 格式 | op (6bit) | rs (5) | rt (5) | rd (5) | shamt (5) | funct (6) | 说明 |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| **R型** | 0 | 源1 | 源2 | 目 | 移位量 | 功能码 | 算术/逻辑运算 |
| **I型** | op | 源1 | 源/目 | 16位立即数 / 地址偏移量 | - | - | 访存、立即数、分支 |
| **J型** | op | 26位目标地址 (Target Address) | - | - | - | - | 无条件跳转 |

* **注意**：lw (取数) 指令中，rt 是存放结果的目标寄存器；sw (存数) 指令中，rt 是源寄存器。

### 2. 五种寻址方式 (Addressing Modes)

1. **立即数寻址 (Immediate)**：操作数就在指令中（I型）。  
2. **寄存器寻址 (Register)**：操作数在寄存器中（R型）。  
3. **基址寻址 (Base/Displacement)**：地址 =寄存器内容 + 16位偏移量（用于 lw, sw）。  
4. **PC相对寻址 (PC-Relative)**：地址 = (PC+4) + 偏移量 $\\times$ 4（用于 beq, bne 分支）。  
5. **伪直接寻址 (Pseudo-direct)**：地址 = (PC+4)的高4位 + 26位立即数 $\\times$ 4（用于 j, jal）。

### 3. C 语言控制结构的翻译

* **条件分支 (if-else)**：  
  * 使用 beq (相等跳转) 或 bne (不相等跳转)。  
  * 配合无条件跳转 j 跳过 else 部分。  
* **循环 (while/for)**：  
  * 在循环体开始处设置标签（如 loop:）。  
  * 在循环结束处使用 j loop 跳回。  
  * 在进入循环或循环末尾判断退出条件。

### 4. 过程调用与栈帧 (Procedure Call)

过程调用的核心步骤（JAL/JR）：

1. **参数传递**：由调用者将参数放入 $a0-$a3。  
2. **控制转移**：执行 jal Label（保存返回地址到 $ra 并跳转）。  
3. **保存现场**：被调用者若要使用 $s0-$s7 或再次调用函数，需将 $ra 和寄存器压入**栈 (Stack)**。  
4. **执行并返回结果**：结果存入 $v0-$v1。  
5. **恢复现场与返回**：从栈中弹出数据，执行 jr $ra 返回。  
* **栈帧结构**：$sp (栈指针) 指向栈顶，向低地址增长。

---

**三、 典型题型与做题技巧**

### 1. 指令解析与机器码转换

题目：将 lw $t0, 12($s0) 转换为机器码。  
解析：

1. 查表得知 lw 的 op 为 35 (100011)。  
2. $s0 是寄存器 16 (10000)，对应 rs。  
3. $t0 是寄存器 8 (01000)，对应 rt。  
4. 立即数为 12 (0000 0000 0000 1100)。  
5. **拼接**：100011 10000 01000 0000000000001100。

### 2. C 翻译为汇编 (常考)

题目：if (i == j) f = g + h; else f = g - h; (假设 f~j 分别在 $s0~$s4)  
答案：

\`\`\`mips
      bne $s3, $s4, Else  # if i != j, goto Else  
      add $s0, $s1, $s2   # f = g + h  
      j Exit              # skip Else  
Else: sub $s0, $s1, $s2   # f = g - h  
Exit:
\`\`\`

### 3. 栈操作计算

题目：在函数开始处需要保存 3 个寄存器，如何操作 $sp？  
答案：

\`\`\`mips
addi $sp, $sp, -12   # 栈向低地址增长，3个字=12字节  
sw $ra, 8($sp)  
sw $s1, 4($sp)  
sw $s0, 0($sp)
\`\`\`

---

# 第五部分：中央处理器 (约15分)

## 一、 核心考点与答案

#### 1. CPU 执行指令的过程？

**【答案要点】**

1. **取指令 (Fetch)**：根据 PC 从主存中取出指令，PC 增量（PC + 4）。  
2. **指令译码 (Decode)**：解析指令操作码，读取寄存器操作数。  
3. **执行 (Execute)**：利用 ALU 进行算术/逻辑运算或地址计算。  
4. **访存 (Memory)**：如果是 lw/sw 指令，则访问数据存储器。  
5. **写回 (Write Back)**：将结果写回目标寄存器（如 R 型指令或 lw）。  
* *注意：每步都要检测异常，执行末尾检测中断。*

#### 2. CPU 的基本组成？操作元件与状态元件的区别？

**【答案要点】**

* **基本组成**：由**数据通路 (Datapath)** 和 **控制器 (Control Unit)** 组成。  
* **操作元件 (组合逻辑)**：输出只取决于当前输入。如：ALU、加法器、多路选择器 (Mux)、译码器。  
* **状态元件 (时序逻辑)**：具有存储功能，在时钟边沿更新。如：寄存器、PC、存储器。

#### 3. 指令周期与时钟周期？

* **指令周期**：执行一条指令所花费的总时间。  
* **时钟周期**：CPU 操作的最小单位（频率的倒数）。  
* **单周期 CPU**：指令周期 = 时钟周期（所有指令在一个时钟内完成）。  
* **多周期 CPU**：指令周期 = $N \\times$ 时钟周期（不同指令步数不同）。

#### 4. 单周期数据通路与控制信号？ (★核心重点)

【答案要点】  
必须掌握以下 7 个核心控制信号在不同指令下的取值：

| 控制信号 | 功能描述 | R型 (add/sub) | lw (取数) | sw (存数) | beq (分支) |
| :---- | :---- | :---- | :---- | :---- | :---- |
| **RegDst** | 写寄存器选择 (rt还是rd) | **1 (rd)** | 0 (rt) | X | X |
| **RegWrite** | 是否写寄存器 | **1** | **1** | 0 | 0 |
| **ALUSrc** | ALU第二个输入 (寄存器还是立即数) | 0 (reg) | **1 (imm)** | **1 (imm)** | 0 (reg) |
| **MemtoReg** | 写回寄存器的数据源 (ALU还是内存) | 0 (ALU) | **1 (Mem)** | X | X |
| **MemWrite** | 是否写内存 | 0 | 0 | **1** | 0 |
| **Branch** | 是否是分支指令 | 0 | 0 | 0 | **1** |
| **ExtOp** | 立即数扩展方式 (0扩展还是符号扩展) | X | 1 (符号) | 1 (符号) | 1 (符号) |

#### 5. 多周期处理器设计？

**【答案要点】**

* **设计动机**：单周期时钟周期由最慢的指令（lw）决定，浪费严重。多周期通过将指令分解为多个时钟步，让快指令执行短时间，慢指令执行长时间。  
* **状态转换**：使用**有限状态机 (FSM)** 控制。  
  * Step 1: 取指 (所有指令相同)  
  * Step 2: 译码/读寄存器 (所有指令相同)  
  * Step 3: 执行/地址计算/分支完成  
  * Step 4: 访存读/写回 R 型指令  
  * Step 5: lw 写回寄存器

#### 6. 微程序控制器基本思想？

**【答案要点】**

* 将每一条机器指令编写成一段微程序。  
* 微程序由多条**微指令**组成，每条微指令产生一组微操作信号。  
* 优点：设计规整、灵活、易于修改和扩充指令。

### 7. 带异常处理的数据通路 (Exception Handling)

**【考点说明】**
异常处理要求 CPU 在执行指令时，能够检测到特殊事件（如溢出、非法指令等）并跳转到预定义的**异常处理程序入口地址**（在 MIPS 中通常是 \`0x80000180\`）。

**【核心改动/硬件支持】**
要在原有数据通路上支持异常，硬件上需要增加以下部件：
* **EPC (Exception Program Counter)**：一个特殊的寄存器，用于保存发生异常时的那条指令的地址，以便异常处理完后能返回原程序。
* **Cause 寄存器**：记录异常发生的原因（例如：溢出对应代码 12，非法指令对应代码 10）。
* **多路选择器 (Mux) 扩展**：在 PC 的输入端增加输入口。当异常发生时，通过控制信号将 PC 强制置为异常处理程序的入口地址。
* **控制逻辑修改**：当 ALU 检测到溢出（Overflow）信号时，必须将 \`RegWrite\` 信号置为 0（防止错误的结果被写入寄存器），并触发 PC 的跳转。

---

### 8. 多周期处理器的有限状态机 (FSM)

**【考点说明】**
多周期处理器的控制器是一个**时序电路**。它通过有限状态机（FSM）来控制每一条指令在不同的时钟周期内应该开启哪些控制信号。

**【指令执行的 5 个典型状态】**
* **S0 (Fetch - 取指)**：执行 \`IR = Memory[PC]; PC = PC + 4;\`
* **S1 (Decode - 译码)**：读取寄存器堆，同时 ALU 预计算分支目标地址。
* **S2 (Execution - 执行)**：
    * **R型**：\`ALUOut = A op B;\`
    * **访存**：\`ALUOut = A + Offset;\`
    * **分支**：\`if (A == B) PC = ALUOut;\`（此时指令完成）
* **S3 (Memory Access / R-type Completion - 访存或R型写回)**：
    * **lw**：\`Data = Memory[ALUOut];\`
    * **sw**：\`Memory[ALUOut] = B;\`（此时指令完成）
    * **R型**：\`Reg[rd] = ALUOut;\`（此时指令完成）
* **S4 (Write-back - 写回)**：
    * **lw**：\`Reg[rt] = Data;\`（此时指令完成）

**【常见考试题型】**
* **状态转换图**：要求能画出不同指令在 S1 之后的分支路径（如 \`lw\` 需要走 S2->S3->S4，而 \`beq\` 在 S2 结束后就回到 S0）。
* **控制信号取值**：掌握每个状态下关键信号的状态。例如：在 **S0** 状态，\`IRWrite\` 必须有效（为 1）以锁存指令；在 **S3** 状态执行 \`sw\` 时，\`MemWrite\` 必须为 1。

---

**二、 典型题型与计算公式**

### 1. 性能分析 (单周期 vs 多周期)

公式：

$$\\text{CPU时间} = \\text{指令数} \\times \\text{CPI} \\times \\text{时钟周期}$$

* 单周期：CPI = 1。时钟周期 $T$ 极大（由最慢指令决定）。  
* 多周期：CPI > 1。时钟周期 $t$ 极小（由单步操作决定）。

### 2. 控制信号分析题 (课后习题重点)

题目：如果控制信号 RegWrite 在任何情况下总是为 0，哪些指令无法执行？  
答案：所有需要写回寄存器的指令都无法执行，如 R 型指令 (add, sub) 和 lw。但 sw 和 beq 可以正常执行，因为它们不写寄存器。

### 3. swap 指令扩展题

**题目**：实现 swap rs, rt。

* **伪指令方式**：不需要额外寄存器。  
  \`\`\`mips
  xor $rs, $rs, $rt  
  xor $rt, $rs, $rt  
  xor $rs, $rs, $rt
  \`\`\`

* **硬件实现**：需要修改数据通路，增加读写口，可能导致时钟周期变长。

---

**三、 复习建议 (整理进文档)**

1. **熟练画出局部数据通路**：例如，仅包含 beq 的路径或仅包含 lw 的路径。  
2. **背诵控制信号表**：这是考试中选择题和计算题填表的必拿分项。  
3. **理解 PC 更新逻辑**：  
   * 顺序：$PC = PC + 4$  
   * 分支：$PC = (PC+4) + \\text{offset} \\times 4$  
   * 跳转：$PC = (PC+4)_{31:28} \\mid (\\text{address} \\times 4)$

---

# 第六部分：指令流水线 (约 15分)

## 1. 流水线基本概念与硬件实现

### (1) 五级流水段功能划分
MIPS 指令执行过程被划分为五个独立的功能段，每个时钟周期完成一个阶段：
* **IF (Instruction Fetch, 取指)**：根据 PC 值从指令存储器取出指令，同时计算 $PC + 4$。
* **ID (Instruction Decode, 译码/读寄存器)**：产生指令执行所需的控制信号，从寄存器堆读取操作数，并对立即数进行符号扩展。
* **EX (Execute, 执行/计算地址)**：ALU 执行算术/逻辑运算、计算访存地址（Load/Store）或计算分支目标地址（Branch）。
* **MEM (Memory Access, 访存)**：如果是访存指令，则根据 EX 段计算的地址访问数据存储器进行读/写。
* **WB (Write Back, 写回)**：将 ALU 的运算结果或从内存读出的数据写回寄存器堆。

### (2) 流水段寄存器 (Pipeline Registers)
为了实现指令的并行处理，必须在相邻的流水段之间插入寄存器，用于锁存当前段产生的、下一段所需的全部信息：
* **IF/ID**：保存取出的 32 位指令字和 $PC+4$。
* **ID/EX**：保存两个寄存器操作数、符号扩展后的立即数、寄存器编号（rt, rd）以及**所有控制信号**。
* **EX/MEM**：保存 ALU 的运算结果、Zero 标志位、写寄存器编号及要写入内存的数据。
* **MEM/WB**：保存从内存读出的数据、ALU 的运算结果以及写寄存器编号。



### (3) 控制信号的取值与传递
在流水线中，控制信号是在 **ID 阶段**一次性产生的，但它们必须随着指令在流水线中流动，在对应的阶段发挥作用：
* **EX段信号**：\`RegDst\`（选择写目的寄存器）、\`ALUOp\`、\`ALUSrc\`。
* **MEM段信号**：\`Branch\`、\`MemRead\`、\`MemWrite\`。
* **WB段信号**：\`RegWrite\`（写使能）、\`MemtoReg\`（写回源选择）。
* **设计要点**：控制信号被存储在流水段寄存器中逐级向后传递，确保控制逻辑与指令同步。

---

## 2. 流水线冒险 (Hazards) 及解决方法 —— ★大题核心

### (1) 结构冒险 (Structural Hazard)
* **现象**：硬件资源不足，无法支持多条指令同时执行。
* **解决方法**：
    * **哈佛结构**：物理上分离指令存储器和数据存储器。
    * **寄存器访问优化**：规定寄存器堆在**前半周期写、后半周期读**。

### (2) 数据冒险 (Data Hazard) —— 转发技术
* **现象**：指令需要前序指令尚未写回寄存器堆的计算结果。
* **核心对策：转发 (Forwarding/Bypassing)**
    * **EX冲突**：前指令在 EX/MEM 寄存器中有结果，当前指令在 EX 阶段需要。
    * **MEM冲突**：前前指令在 MEM/WB 寄存器中有结果，当前指令在 EX 阶段需要。
* **转发检测条件**（以 rs 为例）：
    * \`if (EX/MEM.RegWrite and EX/MEM.RegisterRd != 0 and EX/MEM.RegisterRd == ID/EX.RegisterRs)\` $\\rightarrow$ 从 EX/MEM 转发。



### (3) Load-Use 冲突 (必须停顿)
* **现象**：\`lw\` 指令的数据在 MEM 段结束后才可用，紧跟其后的指令无法仅靠转发获得。
* **处理方法**：**必须阻塞 (Stall)** 一个时钟周期。硬件会清空 ID/EX 寄存器（插入 nop），并保持 PC 和 IF/ID 寄存器不变。

### (4) 控制冒险 (Control Hazard)
* **现象**：分支指令（如 \`beq\`）在结果确定前，后续指令已经进入流水线。
* **对策**：
    * **静态预测**：总是预测不跳转（Predict Not Taken）。
    * **动态预测**：使用分支预测表（BHT）记录历史跳转情况。
    * **延迟分支 (Delayed Branch)**：在分支指令后放入一条总是需要执行的指令（填充延迟槽）。

---

## 3. 异常与中断的处理
* **流水线处理原则**：实现**精确异常 (Precise Exception)**。
* **步骤**：
    1.  清空引起异常指令及其后的所有指令（插入 nop）。
    2.  将异常指令地址保存到 **EPC**。
    3.  记录异常原因到 **Cause** 寄存器。
    4.  跳转到异常处理入口地址（如 \`0x80000180\`）。

---

## 典型题型分析

**公式总结：**
* **流水线时钟周期** = $\\max(\\text{各段延迟}) + \\text{流水段寄存器延迟}$。
* **加速比** = $\\frac{\\text{单周期总执行时间}}{\\text{流水线时钟周期}}$（在不考虑冒险停顿的理想状态下 $\\approx$ 级数）。
* **指令执行总时间** = $(k + n - 1 + \\text{Stall}) \\times \\text{时钟周期}$（$k$ 为段数，$n$ 为指令数）。

**做题技巧：**
1.  **找相关性**：先看指令的寄存器使用情况，确定是否存在“写后读(RAW)”关系。
2.  **看指令类型**：如果是 \`lw\` 后跟引用指令，必须多算一个周期停顿。
3.  **注意转发位置**：转发通常是从流水寄存器（EX/MEM 或 MEM/WB）到 ALU 的输入端。

---

# 第七部分：存储器层次结构 (约 20分)

## 1. 存储器概述与层次结构

### (1) 存储器分类、主存组成与操作
* **分类**：
    * **按存取方式**：随机存取 (RAM)、顺序存取 (SAM，如磁带)、直接存取 (DAM，如磁盘)。
    * **按工作性质**：易失性 (RAM)、非易失性 (ROM)。
* **主存储器组成**：由**存储阵列 (Bank)**、**地址译码驱动电路**、**读写电路**以及 **MAR** (地址寄存器) 和 **MDR** (数据寄存器) 组成。
* **基本操作**：
    * **读操作**：CPU 将地址送入 MAR -> 译码选通单元 -> 读电路将内容送入 MDR。
    * **写操作**：CPU 将地址送入 MAR，数据送入 MDR -> 译码选通单元 -> 写电路将数据存入单元。

### (2) 存储器的层次化结构
* **结构**：寄存器 $\\rightarrow$ Cache $\\rightarrow$ 主存 $\\rightarrow$ 辅存。
* **基本原理**：**程序访问的局部性**。
    * **时间局部性**：最近访问过的数据项很快会再次被访问（如循环）。
    * **空间局部性**：地址相近的数据项很快会再次被访问（如数组、顺序执行指令）。

---

## 2. 半导体存储器与芯片扩展

### (1) SRAM 和 DRAM 的区别
| 特性 | SRAM (静态RAM) | DRAM (动态RAM) |
| :--- | :--- | :--- |
| **存储原理** | 双稳态触发器 (6管) | 电容电荷 (1管) |
| **刷新** | 不需要 | **需要 (定期刷新电荷)** |
| **速度** | 快 (命中时间短) | 慢 |
| **集成度/成本** | 低 / 贵 | 高 / 便宜 |
| **常用场景** | **Cache** | **主存** |

### (2) 存储器芯片的扩展
* **位扩展**：增加存储字长。地址线并联，数据线分别接到不同的 I/O。
* **字扩展**：增加存储单元个数。地址线高位通过**译码器**产生**片选信号 (CS)**。

### (3) 多模块存储器编址
* **连续编址 (高位交叉)**：高位选模块，低位选单元。同一模块地址连续，便于扩容。
* **交叉编址 (低位交叉)**：低位选模块，高位选单元。
    * **特点**：相邻地址在不同模块，支持**流水式并行访问**，显著提高带宽。

---

## 3. 辅存与数据校验

### (1) 磁盘读写与性能
* **读写三步骤**：**寻道** (磁头移到磁道) $\\rightarrow$ **旋转** (等待扇区转到磁头下) $\\rightarrow$ **传输** (读写数据)。
* **性能指标**：
    * **容量**：格式化 vs 非格式化容量。
    * **平均存取时间** = 平均寻道时间 + 平均等待时间 (转半圈) +传输时间。

### (2) 数据校验
* **原理**：增加冗余位，建立校验位与数据位之间的逻辑关系。
* **奇偶校验 (Parity)**：增加 1 位使 1 的个数为奇或偶。只能检错 (1位)，不能纠错。
* **循环冗余校验 (CRC)**：利用模2除法产生余数作为校验码。常用于磁盘数据传输。

---
## 4. 程序访问的局部性 (Locality of Reference) —— ★理论基石

**【考点说明】**
程序在执行时，所访问的指令和数据往往集中在较小的地址范围内。这是存储器分层结构（寄存器-Cache-主存-外存）能够以较低成本获得接近最高速设备性能的理论依据。

**【分类与定义】**：
1. **时间局部性 (Temporal Locality)**：
   - **定义**：如果一个信息项正在被访问，那么在近期它很可能再次被访问。
   - **典型例子**：循环体中的指令、循环中反复使用的累加变量。
2. **空间局部性 (Spatial Locality)**：
   - **定义**：如果一个存储单元被访问，那么与其相邻的存储单元在近期也很可能被访问。
   - **典型例子**：数组的顺序访问、顺序执行的指令序列。

**【应用】**：
- **Cache** 利用时间局部性保留常用数据，利用空间局部性以“块（Block）”为单位从主存调入数据。
- **虚拟存储器** 利用局部性原理，只将进程当前需要的页面调入主存。

---

## 5. 高速缓冲存储器 (Cache) —— ★大题必考

### (1) 基本工作原理
Cache 缓存主存中最活跃的副本。CPU 访存时首先访问 Cache，若命中则不访问主存。

### (2) 三种映射方式 (地址划分)
* **直接映射**：主存块映射到固定 Cache 行。地址 = \`Tag + Index(行索引) + Offset(块内地址)\`。
* **全相联映射**：主存块可映射到任意 Cache 行。地址 = \`Tag + Offset\`。
* **组相联映射**：组间直接映射，组内全相联。地址 = \`Tag + Set Index(组索引) + Offset\`。
    * *计算：组数 = 总行数 / 路数*。



### (3) 性能指标
* **命中率 (a)**、**缺失率 (1-a)**。
* **平均访问时间 (AMAT)** = 命中时间 + 缺失率 $\\times$ 缺失损失。

### (4) 替换算法
* **FIFO (先进先出)**：换掉最早进入的块。
* **LRU (最近最少用)**：换掉最久未被使用的块（基于局部性，效果最好）。

### (5) 写策略
* **全写法 (Write Through)**：命中时同时写 Cache 和主存。简单，一致性好。
* **回写法 (Write Back)**：只写 Cache 并设置“脏位 (Dirty bit)”，该块被替换时才写回主存。效率高，减少访存。

---

## 6. 虚拟存储器 (Virtual Memory)

### (1) 基本概念
利用磁盘作为主存的后援，为进程提供比实际物理内存大得多的**虚拟地址空间**。

### (2) 进程虚拟地址空间划分
典型划分为：代码段 (Text)、数据段 (Data)、堆 (Heap)、栈 (Stack)。

### (3) 分页式虚拟存储器工作原理
* **页表 (Page Table)**：存放 VPN (虚拟页号) 到 PPN (物理页号) 的映射，存放在主存中。
* **地址转换**：
    1. CPU 给出虚拟地址 (VA)。
    2. **快表 (TLB)** 查找：命中则直接得 PPN。
    3. 若 TLB 缺失，查主存中的**页表**。命中则得 PPN 且更新 TLB；若页表项有效位为 0，触发**缺页异常**。
    4. **物理地址 (PA)** = PPN + 页内偏移 (Offset)。
    5. 使用 PA 访问 **Cache**。



### (4) 关键点总结
* **页内偏移量**：虚拟地址和物理地址的低位偏移量完全相同。
* **访存次数**：TLB 缺失时，至少需要 2 次主存访问（查页表 + 读数据）。TLB 命中则只需 1 次访存。

---
### 存储器计算题避坑指南：
1. **单位换算**：1KB = $2^{10}$ B，1MB = $2^{20}$ B。地址位数 $n$ 与容量 $2^n$ 对应。
2. **Cache 划分**：
   * 块内偏移位 = $\\log_2(\\text{块大小})$。
   * 组索引位 = $\\log_2(\\text{Cache组数})$。其中组数 = 行数 / 路数。
3. **虚实地址**：页内偏移量在虚拟地址和物理地址中是**完全一样**的。
4. **访存次数**：
   * 无 TLB 时：访问一次数据需要 2 次访存（1次页表 + 1次数据）。
   * 有 TLB 且命中：只需 1 次访存。

---

# 第八部分：系统互联及输入输出组织 (约 10分)

## 1. 外部设备与总线概述

### (1) 外设的分类与特点
* **分类**：输入设备（键盘、鼠标）、输出设备（显示器、打印机）、输入/输出设备（磁盘、网卡）。
* **特点**：
    * **异步性**：外设与 CPU 之间无统一时钟，工作步调不一致。
    * **实时性**：外设请求必须及时响应，否则可能导致数据丢失。
    * **复杂性**：不同外设的传输速率和数据格式差异巨大。

### (2) 外设与 CPU/主存的互连（总线与编址）
* **总线 (Bus)**：计算机部件之间共享的传输线路。分为**数据总线、地址总线、控制总线**。
* **I/O 接口的功能**：地址译码、数据缓冲、状态监测、控制逻辑。
* **I/O 端口编址方式**：
    * **统一编址 (Memory-mapped I/O)**：将 I/O 端口映射到内存地址空间。
        * *优点*：无需专门指令，使用访存指令（\`lw\`/\`sw\`）即可访问。
        * *缺点*：占用部分内存地址空间。MIPS 采用此方式。
    * **独立编址 (I/O-mapped I/O)**：专门的 I/O 地址空间，使用专门指令（如 \`in\`/\`out\`）访问。


### (3) 总线系统 (Bus System)

* **基本概念**：
  * **总线**：一组能为多个部件分时共享的公共信息传输线路。
  * **系统总线**：连接 CPU、主存、I/O 接口的总线。

* **总线三类线路及其功能**
  1.  **数据线 (Data Bus)**：双向传输。用于在 CPU、内存、I/O 接口之间传送数据（指令、操作数）。其位数（总线宽度）决定了单次传输的能力。
  2.  **地址线 (Address Bus)**：单向传输（由 CPU 发出）。用于指明操作数所在的存储单元地址或 I/O 端口地址。其位数决定了 CPU 的寻址范围。
  3.  **控制线 (Control Bus)**：传输控制信号（如读/写使能、请求/响应、时钟、复位）。用于协调各部件的操作。

---

## 2. I/O 数据传送控制方式 (★核心考点)

这是本章最重要的理论点，要求理解三种方式的原理及其演进逻辑。

### (1) 程序查询方式 (Programmed I/O / Polling)
* **原理**：CPU 通过执行程序，不断读取外设的状态寄存器，检查其是否准备就绪。
* **特点**：
    * **CPU 踏步等待**：在外设准备期间，CPU 无法做其他事。
    * **串行工作**：CPU 与外设完全串行，效率极低。

### (2) 程序中断方式 (Interrupt-driven I/O)
* **原理**：外设在准备好数据后主动向 CPU 发出中断请求，CPU 暂停当前程序转而执行中断服务程序（ISR）。
* **特点**：CPU 与外设**部分并行**；CPU 仅在数据准备好时介入，不再需要主动等待。

### (3) 直接存储器存取 (DMA)
* **原理**：由专门的 **DMA 控制器**接管总线控制权。
* **特点**：
    * **高度并行**：数据直接在**外设和主存**之间传输，不经过 CPU。
    * **介入点**：CPU 只在传输开始前（初始化）和结束后（中断告知完成）介入。
    * **适用场景**：适合高速、大批量数据的传输（如磁盘读写）。



---

## 3. 中断处理与屏蔽字计算 (★计算/简答题)

### (1) 中断处理全过程
1.  **中断请求**：外设发出信号。
2.  **中断响应**：CPU 在**当前指令执行结束时**检测并响应。
3.  **关中断**：禁止更高优先级的请求干扰。
4.  **保存断点**：将当前 PC 存入 **EPC**（或栈）。
5.  **识别中断源**：查表或向量中断。
6.  **保护现场**：保存通用寄存器。
7.  **执行 ISR**：执行真正的 I/O 操作。
8.  **恢复现场与开中断**。
9.  **中断返回**：执行 \`eret\` 或 \`jr $ra\` 返回原程序。

### (2) 中断优先级与屏蔽字
* **中断屏蔽字 (Interrupt Mask)**：每一位对应一个中断源。
    * **1**：表示屏蔽（该位对应的中断不能中断当前处理）。
    * **0**：表示允许（该位对应的中断可以嵌套执行）。
* **设置规律**：
    * 一般情况下，屏蔽字中对应**本级及所有低优先级**的位应设为 1。

---

## 4. 三种 DMA 传送方式 (DMA 冲突处理)

当 DMA 控制器与 CPU 同时竞争访问主存时，有三种解决方法：

1.  **CPU 停止法**：
    * **原理**：DMA 传送时，CPU 放弃总线控制权并停止工作，直到整个数据块传完。
    * **优点**：控制简单，适合高速设备。
    * **缺点**：CPU 闲置时间长，严重影响效率。

2.  **周期挪用法 (Cycle Stealing)**：
    * **原理**：DMA 每次申请挪用一个或几个总线周期来传输一个字。
    * **冲突处理**：若 CPU 不访存，则无冲突；若 CPU 正在访存，则 DMA 等待当前周期结束；若同时请求，**优先满足 DMA**。
    * **特点**：对 CPU 性能影响小，现代系统最常用。

3.  **交替分时访问法**：
    * **原理**：将一个 CPU 周期分为两半，$C_1$ 专供 CPU，$C_2$ 专供 DMA。
    * **特点**：总线控制权按固定比例分配，CPU 和 DMA 互不干扰，但硬件实现复杂。

---

## 5. I/O 子系统的层次结构

### (1) 软硬件层次划分
1.  **用户层 I/O 软件**：通过库函数（如 \`printf\`）发出 I/O 请求。
2.  **设备独立性软件**：逻辑 I/O。处理对所有设备通用的功能（如缓冲、纠错、独占设备管理）。
3.  **设备驱动程序**：与具体硬件直接通信，将逻辑指令转换为特定的设备寄存器操作。
4.  **中断处理程序**：当 I/O 完成时，负责唤醒等待的驱动程序。
5.  **硬件层**：具体的控制器和外部设备。

### (2) 用户程序、C语言库、内核之间的关系
* **用户程序**：调用 C 语言标准库函数（如 \`fread\`）。
* **C语言库 (标准库)**：封装了底层的**系统调用 (System Call)**。
* **内核 (Kernel)**：接收系统调用请求，通过内核态的驱动程序直接控制硬件。

---

## 6. I/O 传送控制方式对比 (★核心总结)

| 特性 | 程序查询 (Polling) | 程序中断 (Interrupt) | 直接存储器存取 (DMA) |
| :--- | :--- | :--- | :--- |
| **数据流向** | 设备 $\\leftrightarrow$ CPU $\\leftrightarrow$ 内存 | 设备 $\\leftrightarrow$ CPU $\\leftrightarrow$ 内存 | 设备 $\\leftrightarrow$ 内存 (不经CPU) |
| **并行性** | 完完全串行 | 部分并行 (准备数据时并行) | 高度并行 (传送过程并行) |
| **CPU 介入** | 全程参与，踏步等待 | 仅处理中断服务程序 | 仅初始化和结束处理 |
| **响应时机** | CPU 轮询时 | **当前指令执行结束时** | **当前总线周期结束时** |
| **适用场景** | 慢速、简单设备 | 中速设备、异常处理 | 高速、大批量数据传输 |

---
## 5. 典型题型分析

**【计算题：中断开销分析】**
* **题目**：CPU 频率 500MHz，外设传输率 2MB/s。接口缓存 16位（2字节）。中断服务程序需 500 个时钟周期。问：能否使用中断方式？
* **解题逻辑**：
    1.  **计算中断频率**：外设每产生 2 字节发一次中断。$f = 2\\text{MB/s} \\div 2\\text{字节} = 10^6$ 次/秒。
    2.  **计算每秒 CPU 耗时**：$10^6 \\times 500 = 5 \\times 10^8$ 个周期。
    3.  **对比主频**：CPU 每秒总周期 = 500MHz = $5 \\times 10^8$。
    4.  **结论**：CPU 100% 的时间都在处理中断，无法运行其他程序。**不可用中断方式，应改用 DMA**。

**【简答题：中断 vs DMA】**
* **中断响应**：在一条指令执行结束时。
* **DMA 响应**：在一个总线周期（Bus Cycle）结束时，响应更快。
* **数据流向**：中断方式数据必须流经 CPU 寄存器；DMA 数据直达内存。
`;

// --- Helper Functions ---

const floatToIEEE754 = (val) => {
  if (isNaN(val)) return { sign: "0", exponent: "00000000", fraction: "00000000000000000000000" };
  const buffer = new ArrayBuffer(4);
  const view = new DataView(buffer);
  view.setFloat32(0, val);
  const bits = view.getUint32(0).toString(2).padStart(32, "0");
  return {
    sign: bits.substring(0, 1),
    exponent: bits.substring(1, 9),
    fraction: bits.substring(9),
    hex: "0x" + view.getUint32(0).toString(16).toUpperCase().padStart(8, "0")
  };
};

const toBinary = (n, bits) => {
  if (isNaN(n)) return "0".repeat(bits);
  if (n < 0) {
    n = (1 << bits) + n;
  }
  return n.toString(2).padStart(bits, "0").slice(-bits);
};

// Generates a simple ID from text
const generateId = (text) => {
    return text.toString().trim().replace(/\s+/g, '-');
};

const CHAPTERS = [
    { id: "第一部分：计算机系统概述-(约-5分)", title: "1. 计算机系统概述", range: [0, 1] },
    { id: "第二部分：数据的机器级表示-(约-10分)", title: "2. 数据的机器级表示", range: [1, 5] },
    { id: "第三部分：运算方法和运算部件-(约-10分)", title: "3. 运算方法和运算部件", range: [5, 7] },
    { id: "第四部分：指令系统-(约15分)", title: "4. 指令系统", range: [7, 8] },
    { id: "第五部分：中央处理器-(约15分)", title: "5. 中央处理器", range: [8, 9] },
    { id: "第六部分：指令流水线-(约-15分)", title: "6. 指令流水线", range: [9, 10] },
    { id: "第七部分：存储器层次结构-(约-20分)", title: "7. 存储器层次结构", range: [10, 11] },
    { id: "第八部分：系统互联及输入输出组织-(约-10分)", title: "8. 系统互联与IO", range: [11, 12] },
];

// --- Interactive Visualizations ---

interface ToolCardProps {
  title: string;
  icon: any;
  children?: React.ReactNode;
  chapter?: string;
}

const ToolCard = ({ title, icon: Icon, children, chapter }: ToolCardProps) => (
  <div className="bg-white rounded-xl border border-slate-300 shadow-sm overflow-hidden mb-6">
    <div className="bg-slate-100 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon className="w-4 h-4 text-indigo-700" />
        <h3 className="font-bold text-slate-800 text-sm">{title}</h3>
      </div>
      {chapter && <span className="text-[10px] bg-slate-200 px-1.5 py-0.5 rounded text-slate-500 font-medium">Ch.{chapter}</span>}
    </div>
    <div className="p-4 space-y-4">
      {children}
    </div>
  </div>
);

const InputField = ({ label, value, onChange, step = "1", suffix = undefined }) => (
  <div className="space-y-1">
    <div className="flex justify-between">
      <label className="text-xs font-bold text-slate-800 uppercase tracking-wide">{label}</label>
      {suffix && <span className="text-xs text-slate-500 font-medium">{suffix}</span>}
    </div>
    <input 
      type="number" step={step}
      value={value} onChange={e => onChange(parseFloat(e.target.value))}
      className="w-full p-2 bg-white border border-slate-300 hover:border-slate-400 rounded-md text-slate-900 font-mono text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all font-bold"
    />
  </div>
);

// Ch1. Abstraction Layers
const AbstractionLayersViz = () => {
    const [selected, setSelected] = useState<number | null>(4); // Default to ISA

    const layers = [
        { name: "应用软件", en: "Applications", desc: "处理特定任务 (如 Office)", color: "bg-slate-400" },
        { name: "算法", en: "Algorithms", desc: "解决问题的步骤 (如 排序)", color: "bg-slate-400" },
        { name: "编程语言", en: "Language", desc: "人机沟通的桥梁 (如 C++)", color: "bg-slate-400" },
        { name: "操作系统/虚拟机", en: "OS / VM", desc: "管理硬件资源 (如 Linux)", color: "bg-slate-500" },
        { name: "ISA (指令集)", en: "ISA", desc: "软硬件的关键接口 (如 MIPS)", color: "bg-indigo-600", isKey: true },
        { name: "微体系结构", en: "Microarchitecture", desc: "ISA 的具体实现 (如 流水线)", color: "bg-slate-600" },
        { name: "硬件电路", en: "Hardware", desc: "物理实现 (如 晶体管)", color: "bg-slate-700" },
    ];

    return (
        <ToolCard title="计算机系统层次结构" icon={Layers} chapter="1">
            <div className="text-[10px] text-center text-slate-400 mb-2 flex items-center justify-center gap-1">
                <MousePointerClick className="w-3 h-3" /> 点击层级查看详情
            </div>
            <div className="flex flex-col gap-1">
                {layers.map((l, i) => (
                    <div 
                        key={i}
                        onClick={() => setSelected(i)}
                        className={`
                            ${l.color} p-2 rounded text-white text-xs font-bold text-center cursor-pointer transition-all hover:brightness-110 select-none
                            ${selected === i ? 'ring-2 ring-offset-1 ring-indigo-500 scale-105 shadow-md z-10' : 'opacity-90 scale-100'}
                            ${l.isKey ? 'border-2 border-indigo-300' : ''}
                        `}
                    >
                        {l.name}
                    </div>
                ))}
            </div>
            {selected !== null && (
                <div className="mt-3 p-3 bg-slate-50 rounded border border-slate-200 text-xs text-center shadow-inner">
                     <div className="font-bold text-slate-800 mb-1 text-sm">{layers[selected].en}</div>
                     <div className="text-slate-600">{layers[selected].desc}</div>
                     {layers[selected].isKey && <div className="text-indigo-600 font-bold mt-1">★ 软硬件交界面</div>}
                </div>
            )}
        </ToolCard>
    );
};

// Ch1. Translation Process
const CompilationProcessViz = () => {
    return (
        <ToolCard title="翻译过程 (C to EXE)" icon={FileCode} chapter="1">
            <div className="flex flex-col gap-2 relative pl-4 border-l-2 border-indigo-100 ml-2">
                {[
                    { ext: ".c", desc: "源程序 (Source)", tool: "预处理 (cpp)", color: "text-slate-600" },
                    { ext: ".i", desc: "预处理文件", tool: "编译器 (cc1)", color: "text-slate-600" },
                    { ext: ".s", desc: "汇编程序 (ASM)", tool: "汇编器 (as)", color: "text-indigo-600 font-bold" },
                    { ext: ".o", desc: "机器码 (Obj)", tool: "链接器 (ld)", color: "text-slate-800" },
                    { ext: ".exe", desc: "可执行文件", tool: "加载运行", color: "text-emerald-600 font-bold" },
                ].map((step, idx) => (
                    <div key={idx} className="relative">
                        <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-indigo-400 ring-4 ring-white"></div>
                        <div className="flex justify-between items-center mb-1">
                            <span className={`text-xs ${step.color}`}>{step.ext}</span>
                            {idx < 4 && <span className="text-[10px] text-slate-400 bg-slate-100 px-1 rounded">{step.tool}</span>}
                        </div>
                        <div className="text-[10px] text-slate-500">{step.desc}</div>
                         {idx < 4 && <div className="h-4 border-l border-dashed border-slate-300 ml-0.5 my-1 absolute left-[-2px] hidden"></div>}
                    </div>
                ))}
            </div>
        </ToolCard>
    );
};


// Ch1. Amdahl
const AmdahlCalc = () => {
  const [f, setF] = useState(0.6);
  const [s, setS] = useState(2);
  const speedup = useMemo(() => {
    const val = 1 / ((1 - f) + (f / s));
    return isFinite(val) ? val : 0;
  }, [f, s]);

  return (
    <ToolCard title="Amdahl 定律" icon={TrendingUp} chapter="1">
       <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded flex justify-center items-center h-16">
            <div className="text-sm font-serif italic text-slate-800 font-medium">
                Speedup = <div className="inline-flex flex-col align-middle text-center mx-1 relative top-2">
                    <span className="border-b border-slate-800 pb-0.5 mb-0.5">1</span>
                    <span>(1-f) + f/S</span>
                </div>
            </div>
      </div>
      <InputField label="可改进比例 (Fe)" value={f} onChange={setF} step="0.05" suffix="0.0 - 1.0" />
      <InputField label="加速倍数 (Se)" value={s} onChange={setS} step="0.5" suffix="> 1.0" />
      <div className="mt-4 p-3 bg-indigo-600 rounded-lg text-white text-center">
        <div className="text-xs uppercase opacity-80 mb-1 font-bold">Total Speedup</div>
        <div className="text-2xl font-bold font-mono">{speedup.toFixed(2)}x</div>
      </div>
    </ToolCard>
  );
};

// Ch1. CPU Time
const CpuTimeCalc = () => {
  const [ic, setIc] = useState(1000); 
  const [cpi, setCpi] = useState(1.5);
  const [freq, setFreq] = useState(2); 
  const timeNs = useMemo(() => {
    if (freq === 0) return 0;
    return (ic * cpi) / freq; 
  }, [ic, cpi, freq]);

  return (
    <ToolCard title="CPU 执行时间" icon={Cpu} chapter="1">
      <div className="mb-4 p-3 bg-slate-50 border border-slate-200 rounded flex justify-center items-center h-16">
            <div className="text-sm font-serif italic text-slate-800 font-medium">
                Time = <div className="inline-flex flex-col align-middle text-center mx-1 relative top-2">
                    <span className="border-b border-slate-800 pb-0.5 mb-0.5">IC × CPI</span>
                    <span>Freq</span>
                </div>
            </div>
      </div>
      <InputField label="指令条数 (IC)" value={ic} onChange={setIc} />
      <div className="grid grid-cols-2 gap-3">
        <InputField label="CPI" value={cpi} onChange={setCpi} step="0.1" />
        <InputField label="主频 (GHz)" value={freq} onChange={setFreq} step="0.1" />
      </div>
      <div className="mt-4 p-3 border border-indigo-200 bg-indigo-50 rounded-lg flex justify-between items-center">
         <span className="text-xs font-bold text-indigo-900 uppercase">Time</span>
         <span className="text-lg font-bold text-indigo-700 font-mono">{timeNs.toFixed(2)} ns</span>
      </div>
    </ToolCard>
  );
};

// Ch2. Endianness Visualizer
const EndiannessViz = () => {
  const [val, setVal] = useState(0x12345678);
  
  // Format as 8 hex digits
  const hexString = val.toString(16).toUpperCase().padStart(8, '0');
  const bytes = [
    hexString.substring(0, 2),
    hexString.substring(2, 4),
    hexString.substring(4, 6),
    hexString.substring(6, 8)
  ];

  return (
    <ToolCard title="大小端存储 (Endianness)" icon={Database} chapter="2">
        {/* Input */}
        <div className="mb-4">
             <label className="text-xs font-bold text-slate-500 uppercase">32-bit Integer (Hex)</label>
             <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 rounded-md px-2 py-1.5 mt-1">
                <span className="text-slate-400 font-mono">0x</span>
                <input 
                    type="text" 
                    value={hexString}
                    onChange={(e) => {
                        const v = parseInt(e.target.value, 16);
                        if (!isNaN(v)) setVal(v);
                    }}
                    maxLength={8}
                    className="bg-transparent outline-none font-mono font-bold text-slate-800 w-full uppercase"
                />
             </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            {/* Big Endian */}
            <div>
                <div className="text-center text-xs font-bold text-indigo-700 mb-2">大端模式 (Big Endian)</div>
                <div className="flex flex-col border border-indigo-200 rounded-md overflow-hidden text-xs">
                    {bytes.map((b, i) => (
                        <div key={i} className="flex border-b border-indigo-100 last:border-0">
                            <div className="bg-indigo-50 text-indigo-400 w-12 py-1.5 px-2 font-mono border-r border-indigo-100">+{i}</div>
                            <div className="flex-1 py-1.5 text-center font-mono font-bold text-slate-700 bg-white">{b}</div>
                        </div>
                    ))}
                </div>
                <div className="text-[10px] text-center text-slate-400 mt-1">MSB 在低地址</div>
            </div>

            {/* Little Endian */}
            <div>
                <div className="text-center text-xs font-bold text-emerald-700 mb-2">小端模式 (Little Endian)</div>
                <div className="flex flex-col border border-emerald-200 rounded-md overflow-hidden text-xs">
                    {[...bytes].reverse().map((b, i) => (
                        <div key={i} className="flex border-b border-emerald-100 last:border-0">
                            <div className="bg-emerald-50 text-emerald-400 w-12 py-1.5 px-2 font-mono border-r border-emerald-100">+{i}</div>
                            <div className="flex-1 py-1.5 text-center font-mono font-bold text-slate-700 bg-white">{b}</div>
                        </div>
                    ))}
                </div>
                 <div className="text-[10px] text-center text-slate-400 mt-1">LSB 在低地址 (x86)</div>
            </div>
        </div>
    </ToolCard>
  )
}

// Ch2. Base Converter
const BaseConverter = () => {
    const [dec, setDec] = useState("255");
    
    // safe parsing
    const updateDec = (v) => setDec(v);
    const updateHex = (v) => {
        const i = parseInt(v, 16);
        if (!isNaN(i)) setDec(i.toString());
        else if (v==="") setDec("");
    }
    const updateBin = (v) => {
        const i = parseInt(v, 2);
        if (!isNaN(i)) setDec(i.toString());
        else if (v==="") setDec("");
    }

    const intVal = parseInt(dec) || 0;
    const hexVal = intVal.toString(16).toUpperCase();
    const binVal = intVal.toString(2);

    return (
        <ToolCard title="进制转换器" icon={ArrowLeftRight} chapter="2">
            <div className="space-y-3">
                <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-1">Decimal (十进制)</label>
                    <input 
                        type="number" value={dec} onChange={e => updateDec(e.target.value)}
                        className="p-1.5 border border-slate-300 rounded font-mono text-sm font-bold text-slate-800 focus:ring-2 ring-indigo-500 outline-none"
                    />
                </div>
                <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-1">Hexadecimal (十六进制)</label>
                    <div className="relative">
                        <span className="absolute left-2 top-1.5 text-slate-400 font-mono text-sm">0x</span>
                        <input 
                            type="text" value={hexVal} onChange={e => updateHex(e.target.value)}
                            className="w-full pl-7 p-1.5 border border-slate-300 rounded font-mono text-sm font-bold text-emerald-700 focus:ring-2 ring-emerald-500 outline-none uppercase"
                        />
                    </div>
                </div>
                <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-slate-500 uppercase mb-1">Binary (二进制)</label>
                    <input 
                        type="text" value={binVal} onChange={e => updateBin(e.target.value)}
                        className="p-1.5 border border-slate-300 rounded font-mono text-sm font-bold text-indigo-600 focus:ring-2 ring-indigo-500 outline-none break-all"
                    />
                </div>
            </div>
        </ToolCard>
    )
}

// Ch2. IEEE 754
const Ieee754Calc = () => {
  const [number, setNumber] = useState<string | number>(12.5);
  const data = floatToIEEE754(Number(number));

  return (
    <ToolCard title="IEEE 754 (32位)" icon={Binary} chapter="2">
       <div className="space-y-1">
          <label className="text-xs font-bold text-slate-700 uppercase">十进制输入</label>
          <input 
            type="number" value={number} onChange={e => setNumber(e.target.value)}
            className="w-full p-2 bg-white border border-slate-300 rounded-md text-slate-900 font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
       </div>
       <div className="flex h-10 rounded-md overflow-hidden border border-slate-300 shadow-sm text-xs font-bold">
          <div className="w-[10%] bg-rose-200 text-rose-900 flex items-center justify-center border-r border-rose-300" title="Sign">{data.sign}</div>
          <div className="w-[30%] bg-emerald-200 text-emerald-900 flex items-center justify-center border-r border-emerald-300" title="Exponent">{data.exponent}</div>
          <div className="w-[60%] bg-blue-200 text-blue-900 flex items-center justify-center overflow-hidden whitespace-nowrap" title="Mantissa">{data.fraction.substring(0,8)}..</div>
       </div>
       <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-600">
          <div className="bg-slate-100 p-1.5 rounded border border-slate-200">
             <span className="block text-slate-400 text-[10px]">HEX</span>
             <span className="font-bold text-slate-800">{data.hex}</span>
          </div>
          <div className="bg-slate-100 p-1.5 rounded border border-slate-200">
             <span className="block text-slate-400 text-[10px]">E (Real)</span>
             <span className="font-bold text-slate-800">{parseInt(data.exponent, 2) - 127}</span>
          </div>
       </div>
    </ToolCard>
  );
};

// Ch2. Complement
const ComplementCalc = () => {
    const [val, setVal] = useState(5);
    const [bits, setBits] = useState(8);
    const max = Math.pow(2, bits-1) - 1;
    const min = -Math.pow(2, bits-1);
    const binary = toBinary(val, bits);

    return (
        <ToolCard title="补码计算器" icon={Calculator} chapter="2">
             <div className="flex gap-2">
                <div className="flex-1">
                   <InputField label="数值 (DEC)" value={val} onChange={setVal} />
                </div>
                <div className="w-20">
                    <label className="text-xs font-bold text-slate-700 uppercase block mb-1">位宽</label>
                    <select 
                        value={bits} onChange={e => setBits(parseInt(e.target.value))}
                        className="w-full p-2 bg-white border border-slate-300 rounded-md font-mono text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                    >
                        <option value="4">4</option>
                        <option value="8">8</option>
                        <option value="16">16</option>
                    </select>
                </div>
             </div>
             <div className="bg-slate-800 rounded-md p-3 text-center border border-slate-700">
                 <div className="text-xs text-slate-400 mb-1">机器码 (Binary)</div>
                 <div className="text-xl font-mono text-emerald-400 tracking-wider font-bold">{binary}</div>
             </div>
             {(val > max || val < min) && <div className="text-rose-600 text-xs font-bold text-center">⚠️ 溢出 [{min}, {max}]</div>}
        </ToolCard>
    );
};

// Ch3. ALU Simulator (8-bit)
const AluSimulator = () => {
  const [a, setA] = useState(5);
  const [b, setB] = useState(3);
  const [op, setOp] = useState('ADD');

  // Constants for 8-bit
  const MAX_UINT = 255;
  const MIN_INT = -128;
  const MAX_INT = 127;

  // Mask to keep 8 bits
  const mask = (v) => v & 0xFF;
  // Sign extend 8 bits to 32 bits JS number
  const signExtend = (v) => (v << 24) >> 24;

  const resultData = useMemo(() => {
    let res = 0;
    let fullRes = 0; // used for checking carry in ADD
    
    // Inputs treated as 8-bit signed usually for overflow
    // but JS inputs are just numbers. Let's clamp them conceptually or just use them.
    // For simulation, let's treat A and B as user inputs (can be anything, but we look at low 8 bits)
    const valA = mask(a);
    const valB = mask(b);
    
    // Signed interpretations
    const signedA = signExtend(valA);
    const signedB = signExtend(valB);
    
    let cf = 0;
    let of = 0;

    switch(op) {
      case 'ADD':
        fullRes = valA + valB;
        res = mask(fullRes);
        // CF: Carry out of MSB
        cf = fullRes > MAX_UINT ? 1 : 0;
        // OF: (Pos + Pos = Neg) or (Neg + Neg = Pos)
        // Simple formula: if sign of inputs are same, and result sign is different.
        const signedResAdd = signExtend(res);
        if ((signedA >= 0 && signedB >= 0 && signedResAdd < 0) || 
            (signedA < 0 && signedB < 0 && signedResAdd >= 0)) {
           of = 1;
        }
        break;
      case 'SUB':
        // A - B = A + (-B)
        // Logic for subtraction flags:
        fullRes = valA - valB;
        res = mask(fullRes);
        // CF in subtraction: Borrow. If A < B (unsigned), then borrow occurs.
        // Some archs (ARM) invert carry on sub, x86 sets CF on borrow. MIPS uses "sltu".
        // We'll use standard Borrow definition:
        cf = valA < valB ? 1 : 0;
        
        // OF: (Pos - Neg = Neg) or (Neg - Pos = Pos)
        const signedResSub = signExtend(res);
        if ((signedA >= 0 && signedB < 0 && signedResSub < 0) ||
            (signedA < 0 && signedB >= 0 && signedResSub >= 0)) {
            of = 1;
        }
        break;
      case 'AND':
        res = valA & valB;
        cf = 0; of = 0;
        break;
      case 'OR':
        res = valA | valB;
        cf = 0; of = 0;
        break;
    }

    const zf = res === 0 ? 1 : 0;
    const sf = (res & 0x80) ? 1 : 0;

    return { res, zf, sf, cf, of };
  }, [a, b, op]);

  return (
    <ToolCard title="ALU 仿真器 (8-bit)" icon={Cpu} chapter="3">
       <div className="flex gap-2 items-end mb-4">
          <div className="flex-1">
             <label className="text-[10px] font-bold text-slate-500 uppercase">Input A</label>
             <input type="number" value={a} onChange={e => setA(parseInt(e.target.value)||0)} className="w-full p-1.5 border border-slate-300 rounded font-mono text-sm" />
          </div>
          <div className="w-16">
            <select value={op} onChange={e => setOp(e.target.value)} className="w-full p-1.5 bg-slate-100 border border-slate-300 rounded font-bold text-sm text-center">
               <option>ADD</option>
               <option>SUB</option>
               <option>AND</option>
               <option>OR</option>
            </select>
          </div>
          <div className="flex-1">
             <label className="text-[10px] font-bold text-slate-500 uppercase">Input B</label>
             <input type="number" value={b} onChange={e => setB(parseInt(e.target.value)||0)} className="w-full p-1.5 border border-slate-300 rounded font-mono text-sm" />
          </div>
       </div>

       {/* Visual Representation */}
       <div className="bg-slate-800 text-white rounded-lg p-4 relative overflow-hidden">
          <div className="flex justify-between items-center mb-4">
             <div className="text-xs text-slate-400 font-mono">Res (Dec): {signExtend(resultData.res)}</div>
             <div className="text-xl font-mono font-bold text-emerald-400">{toBinary(resultData.res, 8)}</div>
          </div>
          
          <div className="grid grid-cols-4 gap-2 text-center">
             <div className={`p-1 rounded border ${resultData.zf ? 'bg-yellow-500 border-yellow-400 text-white font-bold' : 'bg-slate-700 border-slate-600 text-slate-500'}`}>
                <div className="text-[10px]">ZF (Zero)</div>
                <div>{resultData.zf}</div>
             </div>
             <div className={`p-1 rounded border ${resultData.sf ? 'bg-blue-500 border-blue-400 text-white font-bold' : 'bg-slate-700 border-slate-600 text-slate-500'}`}>
                <div className="text-[10px]">SF (Sign)</div>
                <div>{resultData.sf}</div>
             </div>
             <div className={`p-1 rounded border ${resultData.cf ? 'bg-rose-500 border-rose-400 text-white font-bold' : 'bg-slate-700 border-slate-600 text-slate-500'}`}>
                <div className="text-[10px]">CF (Carry)</div>
                <div>{resultData.cf}</div>
             </div>
             <div className={`p-1 rounded border ${resultData.of ? 'bg-purple-500 border-purple-400 text-white font-bold' : 'bg-slate-700 border-slate-600 text-slate-500'}`}>
                <div className="text-[10px]">OF (Ovfl)</div>
                <div>{resultData.of}</div>
             </div>
          </div>
       </div>
       <div className="mt-2 text-[10px] text-slate-500 text-center">
          * OF 仅针对有符号运算; CF 针对无符号
       </div>
    </ToolCard>
  )
}

// Ch3. Bit Shifter
const BitShifter = () => {
    const [val, setVal] = useState(0b10110010);
    const [amt, setAmt] = useState(1);
    const [mode, setMode] = useState<'SLL'|'SRL'|'SRA'>('SLL');

    const bitStr = toBinary(val, 8);
    const bitArray = bitStr.split('');

    // Calculate result
    let res = 0;
    let shiftedBits: string[] = [];

    // Simulate 8-bit shift
    if (mode === 'SLL') {
        res = (val << amt) & 0xFF;
        const resStr = toBinary(res, 8);
        shiftedBits = resStr.split('');
    } else if (mode === 'SRL') {
        res = (val >>> amt) & 0xFF;
        const resStr = toBinary(res, 8);
        shiftedBits = resStr.split('');
    } else { // SRA
        // Need to cast to signed 8-bit int then shift
        const signedVal = (val << 24) >> 24;
        res = (signedVal >> amt) & 0xFF;
        const resStr = toBinary(res, 8);
        shiftedBits = resStr.split('');
    }

    return (
        <ToolCard title="移位运算演示 (Bit Shifter)" icon={MoveHorizontal} chapter="3">
            <div className="flex gap-2 mb-3">
               {['SLL', 'SRL', 'SRA'].map((m: any) => (
                   <button 
                    key={m} onClick={() => setMode(m)}
                    className={`flex-1 py-1 text-xs font-bold rounded ${mode === m ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                   >
                    {m}
                   </button>
               ))}
            </div>

            <div className="mb-4">
               <div className="flex justify-between mb-1">
                 <span className="text-[10px] font-bold text-slate-400 uppercase">Input</span>
                 <input 
                    type="number" value={val} onChange={e=>setVal(parseInt(e.target.value)||0)}
                    className="text-right text-xs p-0 border-none bg-transparent outline-none w-10 font-mono"
                 />
               </div>
               <div className="flex border border-slate-300 rounded overflow-hidden">
                  {bitArray.map((b, i) => (
                      <div key={i} className="flex-1 h-8 flex items-center justify-center bg-white border-r border-slate-200 last:border-0 font-mono text-sm text-slate-600">
                          {b}
                      </div>
                  ))}
               </div>
            </div>

            <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-bold text-slate-500">Shift</span>
                <input 
                    type="range" min="0" max="8" value={amt} onChange={e => setAmt(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-xs font-bold text-indigo-600 w-4 text-center">{amt}</span>
            </div>

            <div>
               <div className="flex justify-between mb-1">
                 <span className="text-[10px] font-bold text-slate-400 uppercase">Result</span>
               </div>
               <div className="flex border border-indigo-300 rounded overflow-hidden">
                  {shiftedBits.map((b, i) => {
                      // Highlight new bits logic
                      let isNew = false;
                      if (mode === 'SLL') {
                          if (i >= 8 - amt) isNew = true; // Zeros from right
                      } else if (mode === 'SRL') {
                          if (i < amt) isNew = true; // Zeros from left
                      } else { // SRA
                          if (i < amt) isNew = true; // Sign bits from left
                      }

                      return (
                        <div key={i} className={`flex-1 h-8 flex items-center justify-center border-r border-indigo-200 last:border-0 font-mono text-sm font-bold ${isNew ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-slate-800'}`}>
                            {b}
                        </div>
                      )
                  })}
               </div>
               {mode === 'SRA' && (
                   <div className="text-[10px] text-indigo-500 mt-1 text-center">
                       * SRA: 高位补符号位 ({bitArray[0]})
                   </div>
               )}
            </div>
        </ToolCard>
    )
}

// Ch4. MIPS Instruction Format
const MipsVisualizer = () => {
  const [instrType, setInstrType] = useState('R'); // R, I, J

  const renderFormat = () => {
    if (instrType === 'R') {
      return (
         <div className="flex text-center text-xs text-white font-bold h-10 rounded overflow-hidden">
            <div className="w-[18.75%] bg-slate-600 flex items-center justify-center border-r border-slate-500">op (6)</div>
            <div className="w-[15.6%] bg-indigo-500 flex items-center justify-center border-r border-indigo-400">rs (5)</div>
            <div className="w-[15.6%] bg-indigo-500 flex items-center justify-center border-r border-indigo-400">rt (5)</div>
            <div className="w-[15.6%] bg-indigo-600 flex items-center justify-center border-r border-indigo-500">rd (5)</div>
            <div className="w-[15.6%] bg-slate-500 flex items-center justify-center border-r border-slate-400">sh (5)</div>
            <div className="w-[18.75%] bg-slate-600 flex items-center justify-center">fn (6)</div>
         </div>
      )
    } else if (instrType === 'I') {
      return (
        <div className="flex text-center text-xs text-white font-bold h-10 rounded overflow-hidden">
            <div className="w-[18.75%] bg-slate-600 flex items-center justify-center border-r border-slate-500">op (6)</div>
            <div className="w-[15.6%] bg-indigo-500 flex items-center justify-center border-r border-indigo-400">rs (5)</div>
            <div className="w-[15.6%] bg-indigo-500 flex items-center justify-center border-r border-indigo-400">rt (5)</div>
            <div className="w-[50%] bg-emerald-600 flex items-center justify-center">Immediate (16)</div>
         </div>
      )
    } else {
       return (
        <div className="flex text-center text-xs text-white font-bold h-10 rounded overflow-hidden">
            <div className="w-[18.75%] bg-slate-600 flex items-center justify-center border-r border-slate-500">op (6)</div>
            <div className="w-[81.25%] bg-purple-600 flex items-center justify-center">Target Address (26)</div>
         </div>
       )
    }
  }

  return (
    <ToolCard title="MIPS 指令格式" icon={Layers} chapter="4">
      <div className="flex gap-2 mb-2">
        {['R', 'I', 'J'].map(t => (
          <button 
            key={t}
            onClick={() => setInstrType(t)}
            className={`flex-1 py-1 text-xs font-bold rounded ${instrType === t ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            {t}型
          </button>
        ))}
      </div>
      {renderFormat()}
      <div className="text-xs text-slate-500 mt-2">
        总长度: 32 bits. OP决定指令类型。
      </div>
    </ToolCard>
  )
}

// Ch4. Addressing Modes
const AddressingModeViz = () => {
    const [mode, setMode] = useState('Base');
    const [pc, setPc] = useState(0x00400000);
    const [reg, setReg] = useState(0x10010000);
    const [imm, setImm] = useState(4); // Raw immediate value

    // Helper to format hex
    const toHex = (n) => "0x" + (n >>> 0).toString(16).toUpperCase().padStart(8, '0');
    
    // Handlers for Hex inputs
    const handleHexChange = (setter) => (e) => {
        const val = parseInt(e.target.value, 16);
        if (!isNaN(val)) setter(val);
    };

    let result = 0;
    let equation = "";
    let desc = "";

    if (mode === 'Base') {
        // Base Addressing: Reg + SignExt(Imm)
        // Assume Imm is 16-bit signed, but input is simplified number
        result = reg + imm;
        equation = `${toHex(reg)} + ${imm}`;
        desc = "基址寻址 (lw/sw): 寄存器值 + 偏移量";
    } else if (mode === 'PC-Rel') {
        // PC-Relative: (PC+4) + (Imm << 2)
        const nextPc = pc + 4;
        const offset = imm * 4;
        result = nextPc + offset;
        equation = `(${toHex(pc)} + 4) + (${imm} × 4)`;
        desc = "PC相对寻址 (beq/bne): (PC+4) + 立即数×4";
    } else {
        // Pseudo-Direct: (PC+4)[31:28] | (Imm << 2)
        const nextPc = pc + 4;
        const high4 = nextPc & 0xF0000000;
        const target = (imm * 4) & 0x0FFFFFFF;
        result = high4 | target;
        equation = `(${toHex(pc)} + 4)[31:28] | (${toHex(imm)} × 4)`;
        desc = "伪直接寻址 (j/jal): PC高4位 拼接 26位立即数×4";
    }

    return (
        <ToolCard title="寻址方式计算器" icon={MapPin} chapter="4">
            <div className="flex gap-2 mb-4 p-1 bg-slate-100 rounded-lg">
                {['Base', 'PC-Rel', 'Pseudo'].map(m => (
                    <button 
                        key={m} 
                        onClick={() => setMode(m)}
                        className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${mode === m ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        {m}
                    </button>
                ))}
            </div>

            <div className="space-y-3">
                {/* Inputs based on mode */}
                {mode !== 'Base' && (
                     <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">PC Address</label>
                        <div className="relative">
                            <span className="absolute left-2 top-1.5 text-slate-400 font-mono text-xs">0x</span>
                            <input 
                                type="text" 
                                value={(pc >>> 0).toString(16).toUpperCase()}
                                onChange={handleHexChange(setPc)}
                                className="w-full pl-6 p-1.5 border border-slate-300 rounded font-mono text-sm font-bold text-slate-700 uppercase focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                    </div>
                )}
                {mode === 'Base' && (
                     <div className="flex flex-col">
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Base Register ($rs)</label>
                        <div className="relative">
                            <span className="absolute left-2 top-1.5 text-slate-400 font-mono text-xs">0x</span>
                            <input 
                                type="text" 
                                value={(reg >>> 0).toString(16).toUpperCase()}
                                onChange={handleHexChange(setReg)}
                                className="w-full pl-6 p-1.5 border border-slate-300 rounded font-mono text-sm font-bold text-slate-700 uppercase focus:ring-2 focus:ring-indigo-500 outline-none"
                            />
                        </div>
                    </div>
                )}
                <div className="flex flex-col">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">
                        {mode === 'Pseudo' ? 'Target Index (26-bit)' : 'Immediate (16-bit)'}
                    </label>
                     <div className="relative">
                         <input 
                            type="number" 
                            value={imm}
                            onChange={(e) => setImm(parseInt(e.target.value)||0)}
                            className="w-full p-1.5 border border-slate-300 rounded font-mono text-sm font-bold text-slate-700 focus:ring-2 focus:ring-indigo-500 outline-none"
                        />
                     </div>
                </div>
            </div>

            <div className="mt-4 p-3 bg-slate-800 rounded text-center">
                <div className="text-[10px] text-slate-400 mb-1 font-mono">{equation}</div>
                <div className="text-xl font-mono font-bold text-emerald-400">{toHex(result)}</div>
                <div className="text-[10px] text-slate-500 mt-1 border-t border-slate-700 pt-1">{desc}</div>
            </div>
        </ToolCard>
    );
};

// Ch4. Stack Frame
const StackFrameViz = () => {
    // We simulate a stack growing down from high memory
    // Initial SP
    const START_SP = 0x7FFFFF00;
    const [frames, setFrames] = useState<{name: string, sp: number, ra: number}[]>([]);
    
    const pushFrame = () => {
        if (frames.length >= 4) return; // Limit depth
        const prevSp = frames.length > 0 ? frames[frames.length-1].sp : START_SP;
        // Allocate simplified frame: 16 bytes (4 words: ra, s0, arg, local)
        const newFrame = {
            name: `Func_${frames.length + 1}`,
            sp: prevSp - 16,
            ra: prevSp + 4 // Return to caller's code
        };
        setFrames([...frames, newFrame]);
    };

    const popFrame = () => {
        if (frames.length === 0) return;
        setFrames(frames.slice(0, -1));
    };

    const currentSp = frames.length > 0 ? frames[frames.length-1].sp : START_SP;

    return (
        <ToolCard title="函数调用栈 (Stack Frame)" icon={Layers} chapter="4">
            <div className="flex gap-2 mb-4">
                <button 
                    onClick={pushFrame} 
                    disabled={frames.length >= 4}
                    className="flex-1 py-1.5 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-300 text-white rounded text-xs font-bold transition-colors"
                >
                    jal (Call)
                </button>
                <button 
                    onClick={popFrame} 
                    disabled={frames.length === 0}
                    className="flex-1 py-1.5 bg-rose-600 hover:bg-rose-600 text-white rounded text-xs font-bold transition-colors"
                >
                    jr $ra (Return)
                </button>
            </div>

            <div className="flex">
                {/* Pointers */}
                <div className="w-16 flex flex-col justify-end items-end pr-2 py-4 space-y-8 relative">
                    <div 
                        className="absolute right-0 text-xs font-bold text-indigo-600 flex items-center gap-1 transition-all duration-300"
                        style={{ top: `${(frames.length * 40) + 10}px` }}
                    >
                        $sp ➤
                    </div>
                </div>

                {/* Stack Memory */}
                <div className="flex-1 border-x-2 border-slate-300 bg-slate-50 relative min-h-[200px]">
                    {/* High Address */}
                    <div className="absolute -top-5 left-0 w-full text-center text-[10px] text-slate-400">High Addr (0x7FFF...)</div>
                    
                    {/* Initial Stack Base */}
                    <div className="h-10 border-b border-dashed border-slate-300 bg-slate-200 flex items-center justify-center text-xs text-slate-500">
                        [Caller Stack]
                    </div>

                    {frames.map((f, i) => (
                        <div key={i} className="h-10 border-b border-slate-300 bg-white flex items-center justify-between px-2 text-xs animate-in slide-in-from-top-2 fade-in duration-300">
                            <span className="font-bold text-indigo-700">{f.name} Frame</span>
                            <span className="font-mono text-[10px] text-slate-400">RA saved</span>
                        </div>
                    ))}
                    
                    {/* Empty Space */}
                    <div className="h-20 flex items-center justify-center text-[10px] text-slate-300">
                        Stack Growth ↓
                    </div>
                </div>
            </div>
            
            <div className="mt-3 flex justify-between items-center bg-slate-100 p-2 rounded">
                 <div className="text-xs font-bold text-slate-600">Current $sp:</div>
                 <div className="font-mono font-bold text-indigo-600">0x{currentSp.toString(16).toUpperCase()}</div>
            </div>
        </ToolCard>
    );
};

// Ch5. Datapath Flow Visualizer
const DatapathViz = () => {
    const [instr, setInstr] = useState('R-type'); // R-type, lw, sw, beq

    // Define active components for each instruction
    const getActive = (i) => {
        const active = {
            'R-type': ['pc', 'im', 'reg', 'alu', 'wb'],
            'lw': ['pc', 'im', 'reg', 'alu', 'dm', 'wb'],
            'sw': ['pc', 'im', 'reg', 'alu', 'dm'],
            'beq': ['pc', 'im', 'reg', 'alu', 'pc-mux']
        };
        return active[i] || [];
    };

    const activeComponents = getActive(instr);

    const isAct = (id) => activeComponents.includes(id) ? "bg-indigo-600 text-white shadow-md border-indigo-700" : "bg-slate-100 text-slate-400 border-slate-200";

    return (
        <ToolCard title="数据通路流向演示" icon={Activity} chapter="5">
            <div className="flex gap-2 mb-4">
                {['R-type', 'lw', 'sw', 'beq'].map(i => (
                    <button 
                        key={i} onClick={() => setInstr(i)}
                        className={`flex-1 py-1 text-xs font-bold rounded ${instr === i ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                    >
                        {i}
                    </button>
                ))}
            </div>

            {/* Simplified Datapath Diagram */}
            <div className="relative h-40 bg-slate-50 border border-slate-200 rounded-lg p-2 text-[10px] font-bold font-mono">
                {/* PC */}
                <div className={`absolute top-16 left-2 w-10 h-8 flex items-center justify-center rounded border transition-colors ${isAct('pc')}`}>PC</div>
                
                {/* IM */}
                <div className={`absolute top-16 left-16 w-12 h-12 flex items-center justify-center rounded border transition-colors ${isAct('im')}`}>IM</div>

                {/* Reg File */}
                <div className={`absolute top-16 left-32 w-14 h-12 flex items-center justify-center rounded border transition-colors ${isAct('reg')}`}>Regs</div>

                {/* ALU */}
                <div className={`absolute top-16 left-52 w-10 h-10 flex items-center justify-center rounded-full border transition-colors ${isAct('alu')}`} style={{clipPath: "polygon(0 0, 100% 20%, 100% 80%, 0 100%)"}}>ALU</div>

                {/* Data Mem */}
                <div className={`absolute top-16 left-64 w-12 h-12 flex items-center justify-center rounded border transition-colors ${isAct('dm')}`}>DM</div>

                {/* WB / RegWrite Path */}
                {/* Just a visual block for write back */}
                <div className={`absolute top-4 left-32 w-14 h-6 flex items-center justify-center rounded border border-dashed transition-colors ${isAct('wb')}`}>Write</div>

                {/* Connections (CSS Arrows) */}
                <svg className="absolute top-0 left-0 w-full h-full pointer-events-none stroke-current text-slate-300" style={{zIndex:0}}>
                     <defs>
                        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                          <path d="M0,0 L0,6 L6,3 z" fill="currentColor" />
                        </marker>
                     </defs>
                     {/* PC -> IM */}
                     <line x1="42" y1="80" x2="62" y2="80" strokeWidth="2" markerEnd="url(#arrow)" className={isAct('pc') && isAct('im') ? "text-indigo-400" : ""} />
                     {/* IM -> Regs */}
                     <line x1="110" y1="80" x2="126" y2="80" strokeWidth="2" markerEnd="url(#arrow)" className={isAct('im') && isAct('reg') ? "text-indigo-400" : ""} />
                     {/* Regs -> ALU */}
                     <line x1="184" y1="80" x2="206" y2="80" strokeWidth="2" markerEnd="url(#arrow)" className={isAct('reg') && isAct('alu') ? "text-indigo-400" : ""} />
                     {/* ALU -> DM */}
                     <line x1="248" y1="80" x2="254" y2="80" strokeWidth="2" markerEnd="url(#arrow)" className={isAct('alu') && isAct('dm') ? "text-indigo-400" : ""} />
                     {/* ALU -> WB (R-type) */}
                     {instr === 'R-type' && <path d="M 248 80 L 252 80 L 252 30 L 156 30 L 156 62" fill="none" strokeWidth="2" markerEnd="url(#arrow)" className="text-indigo-400" />}
                     {/* DM -> WB (lw) */}
                     {instr === 'lw' && <path d="M 304 80 L 310 80 L 310 20 L 156 20 L 156 62" fill="none" strokeWidth="2" markerEnd="url(#arrow)" className="text-indigo-400" />}
                     {/* Branch Path */}
                     {instr === 'beq' && <path d="M 228 70 L 228 10 L 32 10 L 32 62" fill="none" strokeWidth="2" strokeDasharray="4" markerEnd="url(#arrow)" className="text-indigo-400" />}
                </svg>

            </div>
            <div className="text-[10px] text-slate-500 mt-2 text-center">
                *实线: 数据流; 虚线: 控制流/回写
            </div>
        </ToolCard>
    );
};

// Ch5. Multi-cycle FSM Walker
const FsmWalker = () => {
    const [step, setStep] = useState(0);
    const [instr, setInstr] = useState('lw');

    const instructions = {
        'lw':  ['S0: Fetch', 'S1: Decode', 'S2: Calc Addr', 'S3: Read Mem', 'S4: Write Back'],
        'sw':  ['S0: Fetch', 'S1: Decode', 'S2: Calc Addr', 'S3: Write Mem'],
        'beq': ['S0: Fetch', 'S1: Decode', 'S8: Branch'],
        'R':   ['S0: Fetch', 'S1: Decode', 'S6: Execute', 'S7: Write ALU']
    };

    const steps = instructions[instr];
    const maxStep = steps.length - 1;

    const descriptions = {
        'S0: Fetch': 'IR = Mem[PC]; PC = PC + 4',
        'S1: Decode': 'A = Reg[rs]; B = Reg[rt]; ALUOut = PC + (imm<<2)',
        'S2: Calc Addr': 'ALUOut = A + imm (计算地址)',
        'S3: Read Mem': 'MDR = Mem[ALUOut] (读内存)',
        'S4: Write Back': 'Reg[rt] = MDR (写回寄存器)',
        'S3: Write Mem': 'Mem[ALUOut] = B (写内存)',
        'S8: Branch': 'if (A==B) PC = ALUOut (分支判断)',
        'S6: Execute': 'ALUOut = A op B (执行运算)',
        'S7: Write ALU': 'Reg[rd] = ALUOut (写回结果)'
    };

    return (
        <ToolCard title="多周期 FSM 状态机" icon={RotateCcw} chapter="5">
             <div className="flex justify-between items-center mb-4">
                 <div className="flex gap-1">
                    {Object.keys(instructions).map(k => (
                        <button key={k} onClick={()=>{setInstr(k); setStep(0)}} className={`px-2 py-1 text-[10px] font-bold rounded ${instr===k ? 'bg-indigo-600 text-white':'bg-slate-100 text-slate-600'}`}>
                            {k}
                        </button>
                    ))}
                 </div>
                 <div className="text-xs font-bold text-slate-400">Step {step+1}/{maxStep+1}</div>
             </div>

             <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 relative min-h-[100px] flex flex-col justify-center items-center">
                 {/* State Nodes */}
                 <div className="flex gap-2 mb-4 w-full justify-center">
                    {steps.map((s, i) => (
                        <div key={i} className={`w-3 h-3 rounded-full transition-all ${i === step ? 'bg-indigo-600 scale-125 ring-2 ring-indigo-200' : i < step ? 'bg-indigo-300' : 'bg-slate-200'}`}></div>
                    ))}
                 </div>
                 
                 <div className="text-center">
                     <div className="text-sm font-bold text-indigo-700 mb-1">{steps[step]}</div>
                     <div className="text-xs font-mono text-slate-600 bg-white px-2 py-1 rounded border border-slate-200 inline-block">
                        {descriptions[steps[step]]}
                     </div>
                 </div>
             </div>

             <div className="flex gap-2 mt-3">
                 <button disabled={step===0} onClick={()=>setStep(s=>s-1)} className="flex-1 py-1 rounded bg-slate-200 text-slate-600 text-xs font-bold disabled:opacity-50">Back</button>
                 <button disabled={step===maxStep} onClick={()=>setStep(s=>s+1)} className="flex-1 py-1 rounded bg-indigo-600 text-white text-xs font-bold disabled:opacity-50">Next Step</button>
             </div>
        </ToolCard>
    );
};

// Ch5. Exception Handler Demo
const ExceptionDemo = () => {
    const [pc, setPc] = useState(0x00400010);
    const [epc, setEpc] = useState(0x00000000);
    const [cause, setCause] = useState(0); // 0=None, 12=Overflow
    const [status, setStatus] = useState('Running');

    const handleOverflow = () => {
        setEpc(pc);
        setPc(0x80000180);
        setCause(12); // Overflow code
        setStatus('Exception!');
    };

    const reset = () => {
        setPc(0x00400010);
        setEpc(0);
        setCause(0);
        setStatus('Running');
    };

    return (
        <ToolCard title="异常处理模拟器" icon={AlertTriangle} chapter="5">
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-slate-100 p-2 rounded border border-slate-200">
                    <div className="text-[10px] text-slate-500 uppercase font-bold">PC (Program Counter)</div>
                    <div className={`font-mono font-bold text-sm ${cause ? 'text-rose-600' : 'text-slate-700'}`}>0x{pc.toString(16).toUpperCase().padStart(8,'0')}</div>
                </div>
                <div className="bg-slate-100 p-2 rounded border border-slate-200">
                    <div className="text-[10px] text-slate-500 uppercase font-bold">EPC (Saved PC)</div>
                    <div className="font-mono font-bold text-sm text-indigo-600">0x{epc.toString(16).toUpperCase().padStart(8,'0')}</div>
                </div>
            </div>
            
            <div className="bg-slate-50 p-2 rounded border border-slate-200 mb-4 flex justify-between items-center">
                 <div className="text-xs font-bold text-slate-600">Cause Reg: <span className="font-mono">{cause}</span></div>
                 <div className={`text-xs px-2 py-0.5 rounded font-bold ${cause ? 'bg-rose-100 text-rose-700' : 'bg-emerald-100 text-emerald-700'}`}>
                    {cause === 12 ? 'Overflow (12)' : 'Normal (0)'}
                 </div>
            </div>

            <div className="flex gap-2">
                <button 
                    onClick={handleOverflow} 
                    disabled={cause!==0}
                    className="flex-1 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded text-xs font-bold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
                >
                    <AlertTriangle className="w-3 h-3" /> 触发溢出
                </button>
                <button 
                    onClick={reset}
                    className="w-20 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded text-xs font-bold"
                >
                    复位
                </button>
            </div>
        </ToolCard>
    );
};

// Ch5. Control Signals
const ControlSignalViewer = () => {
  const [instr, setInstr] = useState('add');
  
  const signals = {
    'add': { RegDst: 1, RegWrite: 1, ALUSrc: 0, MemtoReg: 0, MemWrite: 0, Branch: 0 },
    'sub': { RegDst: 1, RegWrite: 1, ALUSrc: 0, MemtoReg: 0, MemWrite: 0, Branch: 0 },
    'lw':  { RegDst: 0, RegWrite: 1, ALUSrc: 1, MemtoReg: 1, MemWrite: 0, Branch: 0 },
    'sw':  { RegDst: 'X', RegWrite: 0, ALUSrc: 1, MemtoReg: 'X', MemWrite: 1, Branch: 0 },
    'beq': { RegDst: 'X', RegWrite: 0, ALUSrc: 0, MemtoReg: 'X', MemWrite: 0, Branch: 1 },
  };

  const current = signals[instr];

  return (
    <ToolCard title="CPU 控制信号表" icon={Activity} chapter="5">
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {Object.keys(signals).map(key => (
          <button 
             key={key} 
             onClick={() => setInstr(key)}
             className={`px-3 py-1 rounded text-xs font-bold ${instr === key ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
          >
            {key}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        {Object.entries(current).map(([sig, val]) => (
           <div key={sig} className="flex justify-between p-2 bg-slate-50 border border-slate-200 rounded">
              <span className="font-semibold text-slate-700">{sig}</span>
              <span className={`font-mono font-bold ${val === 1 ? 'text-emerald-600' : val === 0 ? 'text-slate-400' : 'text-orange-500'}`}>
                {val}
              </span>
           </div>
        ))}
      </div>
    </ToolCard>
  );
};

// Ch6. Pipeline Space-Time Diagram
const PipelineSpaceTimeViz = () => {
    const [scenario, setScenario] = useState('RAW'); // RAW, LoadUse, Branch
    const [forwarding, setForwarding] = useState(true);

    const instrs = {
        'RAW': [
            { id: 1, code: 'add $1, $2, $3', color: 'bg-slate-600' },
            { id: 2, code: 'sub $4, $1, $5', color: 'bg-indigo-600' },
            { id: 3, code: 'and $6, $1, $7', color: 'bg-emerald-600' },
            { id: 4, code: 'or  $8, $9, $9', color: 'bg-orange-600' }
        ],
        'LoadUse': [
            { id: 1, code: 'lw  $1, 0($2)', color: 'bg-slate-600' },
            { id: 2, code: 'add $3, $1, $4', color: 'bg-indigo-600' }, // Use immediately
            { id: 3, code: 'sub $5, $6, $7', color: 'bg-emerald-600' },
            { id: 4, code: 'or  $8, $9, $9', color: 'bg-orange-600' }
        ],
        'Branch': [
            { id: 1, code: 'beq $1, $2, L',  color: 'bg-slate-600' },
            { id: 2, code: 'add $3, $4, $5', color: 'bg-rose-500', isMispredicted: true }, // Flushed if mispredicted
            { id: 3, code: 'sub $6, $7, $8', color: 'bg-emerald-600', isTarget: true },
            { id: 4, code: 'or  $9, $0, $0', color: 'bg-orange-600' }
        ]
    };

    const currentInstrs = instrs[scenario];

    // Logic to calculate start times and stalls
    const renderGrid = () => {
        let rows = [];
        let cycleOffset = 0; // Cumulative stalls
        
        for (let i = 0; i < currentInstrs.length; i++) {
            const instr = currentInstrs[i];
            let startCycle = i + cycleOffset; // Standard 1 cycle stagger
            let stalls = 0;
            let bubbles = [];

            // Hazard Detection Logic
            if (scenario === 'RAW' && i === 1 && !forwarding) {
                // Without forwarding, Sub needs $1 from Add.
                // Add produces at WB (Cycle 5), Sub needs at EX (Cycle 3).
                // Must stall 2 cycles so Sub ID reads after Add WB?
                // Simplified: Stall 2 bubbles.
                stalls = 2;
            } 
            else if (scenario === 'LoadUse' && i === 1) {
                // lw produces at MEM (end of C4), add needs at EX (start of C3?? No, start of C3+1).
                // Even with forwarding, need 1 stall.
                stalls = 1;
                if (!forwarding) stalls = 2; // Without forwarding, wait for WB.
            }
            else if (scenario === 'Branch' && i === 1) {
                // Branch resolution. Assume predict not taken.
                // If taken (mispredicted), instr 2 is flushed.
                // We'll visualize flush by turning stages to Bubble/Flush
            }

            cycleOffset += stalls;

            // Generate cells
            let cells = [];
            
            // Empty cells before start
            for(let c=0; c<startCycle; c++) cells.push(<div key={`pre-${c}`} className="w-8 h-8 border-r border-slate-100"></div>);

            const stages = ['IF', 'ID', 'EX', 'MEM', 'WB'];
            
            stages.forEach((stage, idx) => {
                let content = stage;
                let style = instr.color;
                
                // Visualize Stalls (Bubbles) before EX usually
                if (stalls > 0 && idx === 2) { // Insert bubbles before EX (in ID stage usually)
                     for(let s=0; s<stalls; s++) {
                         cells.push(
                             <div key={`stall-${s}`} className="w-8 h-8 border border-dashed border-slate-300 rounded-full bg-slate-50 flex items-center justify-center text-[8px] text-slate-400 mx-0.5">
                                stall
                             </div>
                         );
                     }
                }

                if (scenario === 'Branch' && instr.isMispredicted) {
                    style = "bg-rose-100 text-rose-400 line-through decoration-2"; // Flushed
                }

                cells.push(
                    <div key={stage} className={`w-8 h-8 ${style} text-white flex items-center justify-center text-[10px] font-bold rounded-sm shadow-sm z-10 relative`}>
                        {content}
                    </div>
                );
            });

            rows.push(
                <div key={i} className="flex items-center mb-2">
                    <div className="w-24 text-[10px] font-mono text-slate-600 truncate mr-2 text-right">{instr.code}</div>
                    <div className="flex bg-slate-50 border border-slate-100 rounded p-1">
                        {cells}
                    </div>
                </div>
            );
        }
        return rows;
    };

    return (
        <ToolCard title="流水线时空图生成器" icon={TrendingUp} chapter="6">
            <div className="flex flex-col gap-3">
                {/* Controls */}
                <div className="flex justify-between items-center bg-slate-100 p-2 rounded">
                    <div className="flex gap-1">
                        {Object.keys(instrs).map(k => (
                            <button key={k} onClick={()=>setScenario(k)} className={`px-2 py-1 text-[10px] font-bold rounded ${scenario===k ? 'bg-indigo-600 text-white':'bg-white text-slate-600 shadow-sm'}`}>
                                {k}
                            </button>
                        ))}
                    </div>
                    {scenario !== 'Branch' && (
                        <button 
                            onClick={()=>setForwarding(!forwarding)}
                            className={`flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold transition-colors ${forwarding ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-200 text-slate-500'}`}
                        >
                            <Zap className="w-3 h-3" />
                            {forwarding ? "Forwarding: ON" : "Forwarding: OFF"}
                        </button>
                    )}
                </div>

                {/* Viz Area */}
                <div className="overflow-x-auto pb-2">
                    <div className="min-w-max">
                        {/* Header Cycles */}
                        <div className="flex ml-28 mb-1">
                            {Array.from({length: 12}).map((_, i) => (
                                <div key={i} className="w-8 text-center text-[9px] text-slate-400 font-mono">C{i+1}</div>
                            ))}
                        </div>
                        {renderGrid()}
                    </div>
                </div>

                {/* Legend/Info */}
                <div className="text-[10px] text-slate-500 bg-slate-50 p-2 rounded border border-slate-200">
                    {scenario === 'RAW' && forwarding && "✅ 转发开启：数据直接从 EX/MEM 流向 ALU，无需停顿。"}
                    {scenario === 'RAW' && !forwarding && "⚠️ 转发关闭：必须停顿 2 周期等待写回 (WB) 完成。"}
                    {scenario === 'LoadUse' && "⚠️ Load-Use 冒险：数据在 MEM 段才产生。即使有转发，也必须停顿 1 周期 (Stall)。"}
                    {scenario === 'Branch' && "⚠️ 控制冒险：分支结果在 MEM 段确定(默认)。若预测失败，后续指令被 Flush (清除)。"}
                </div>
            </div>
        </ToolCard>
    );
};

// Ch6. Forwarding Unit Logic Viz
const ForwardingUnitViz = () => {
    const [rs, setRs] = useState(1);
    const [rt, setRt] = useState(2);
    const [exMemRd, setExMemRd] = useState(1);
    const [memWbRd, setMemWbRd] = useState(0);
    const [exMemRw, setExMemRw] = useState(true); // RegWrite
    const [memWbRw, setMemWbRw] = useState(true);

    // Forwarding Logic Implementation
    // ForwardA: 00=ID/EX, 10=EX/MEM, 01=MEM/WB
    let forwardA = "00 (无转发 - 原值)";
    let pathA = "idex"; // idex, exmem, memwb

    // EX Hazard
    if (exMemRw && exMemRd !== 0 && exMemRd === rs) {
        forwardA = "10 (EX/MEM 转发)";
        pathA = "exmem";
    } 
    // MEM Hazard
    else if (memWbRw && memWbRd !== 0 && memWbRd === rs) {
        forwardA = "01 (MEM/WB 转发)";
        pathA = "memwb";
    }

    return (
        <ToolCard title="转发单元逻辑演示" icon={GitBranch} chapter="6">
            <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Inputs (Current Instruction) */}
                <div className="space-y-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase border-b pb-1">当前指令 (ID/EX段)</div>
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-bold text-slate-600">rs (源操作数):</label>
                        <input type="number" value={rs} onChange={e=>setRs(parseInt(e.target.value))} className="w-12 p-1 border rounded text-xs text-center font-bold"/>
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-bold text-slate-600">rt (源操作数):</label>
                        <input type="number" value={rt} onChange={e=>setRt(parseInt(e.target.value))} className="w-12 p-1 border rounded text-xs text-center font-bold"/>
                    </div>
                </div>

                {/* Pipeline Registers */}
                <div className="space-y-2">
                    <div className="text-[10px] font-bold text-slate-400 uppercase border-b pb-1">前序指令状态 (冲突源)</div>
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-bold text-indigo-600">EX/MEM.rd:</label>
                        <div className="flex items-center gap-1">
                            <input type="number" value={exMemRd} onChange={e=>setExMemRd(parseInt(e.target.value))} className="w-10 p-1 border rounded text-xs text-center font-bold"/>
                            <div className="flex items-center" title="RegWrite (写使能)">
                                <input type="checkbox" checked={exMemRw} onChange={e=>setExMemRw(e.target.checked)} className="w-3 h-3"/>
                                <span className="text-[9px] text-slate-400 ml-0.5">写</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <label className="text-xs font-mono font-bold text-emerald-600">MEM/WB.rd:</label>
                        <div className="flex items-center gap-1">
                            <input type="number" value={memWbRd} onChange={e=>setMemWbRd(parseInt(e.target.value))} className="w-10 p-1 border rounded text-xs text-center font-bold"/>
                            <div className="flex items-center" title="RegWrite (写使能)">
                                <input type="checkbox" checked={memWbRw} onChange={e=>setMemWbRw(e.target.checked)} className="w-3 h-3"/>
                                <span className="text-[9px] text-slate-400 ml-0.5">写</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Visual Diagram */}
            <div className="bg-slate-800 rounded-lg p-4 relative h-32 flex items-center justify-center">
                {/* MUX Visual */}
                <div className="w-16 h-20 bg-slate-600 rounded-lg relative flex items-center justify-center z-10 shadow-lg border border-slate-500">
                    <span className="text-white font-bold text-xs">MUX A</span>
                </div>

                {/* Input Lines */}
                {/* ID/EX (Top) */}
                <div className={`absolute left-4 top-8 w-24 h-1 transition-colors ${pathA==='idex' ? 'bg-slate-300' : 'bg-slate-700'}`}></div>
                <div className="absolute left-4 top-6 text-[9px] text-slate-400">ID/EX (原值)</div>

                {/* EX/MEM (Middle) */}
                <div className={`absolute left-4 top-16 w-24 h-1 transition-colors ${pathA==='exmem' ? 'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]' : 'bg-slate-700'}`}></div>
                <div className="absolute left-4 top-14 text-[9px] text-indigo-400">EX/MEM (上条)</div>

                {/* MEM/WB (Bottom) */}
                <div className={`absolute left-4 top-24 w-24 h-1 transition-colors ${pathA==='memwb' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' : 'bg-slate-700'}`}></div>
                <div className="absolute left-4 top-22 text-[9px] text-emerald-400">MEM/WB (上上条)</div>

                {/* Output */}
                <div className="absolute right-4 w-20 h-1 bg-white"></div>
                <div className="absolute right-6 text-[10px] font-bold text-white">至 ALU</div>
            </div>

            <div className="mt-3 text-center">
                <div className="text-xs text-slate-500 font-bold uppercase">转发控制信号 (ForwardA)</div>
                <div className="text-lg font-mono font-bold text-indigo-600 transition-all">{forwardA}</div>
            </div>
        </ToolCard>
    );
};

// Ch6. Pipeline Calc
const PipelineCalc = () => {
  const [k, setK] = useState(5); // stages
  const [n, setN] = useState(100); // instructions
  const [stall, setStall] = useState(0); 

  const cycles = k + n - 1 + stall;
  const idealSpeedup = (n * k) / cycles; // Single cycle takes k*n roughly? Or just compare to k*n? 
  // Document says: Speedup = SingleTotal / PipelineTotal. 
  // Single cycle usually means Clock = Sum(stages). Pipeline Clock = Max(stages).
  // Assuming balanced stages: Single cycle time = k * T_pipe.
  // Speedup = (n * k * T) / ((k + n - 1 + stall) * T) = (n*k) / cycles
  
  return (
    <ToolCard title="流水线性能分析" icon={ArrowRight} chapter="6">
      <div className="grid grid-cols-2 gap-3">
         <InputField label="流水级数 (k)" value={k} onChange={setK} />
         <InputField label="指令数 (n)" value={n} onChange={setN} />
      </div>
      <InputField label="停顿周期 (Stall)" value={stall} onChange={setStall} />
      
      <div className="mt-4 grid grid-cols-2 gap-3 text-center">
         <div className="p-2 bg-slate-100 rounded border border-slate-200">
            <div className="text-[10px] text-slate-500 uppercase">Total Cycles</div>
            <div className="text-lg font-bold text-slate-800">{cycles}</div>
         </div>
         <div className="p-2 bg-indigo-50 rounded border border-indigo-200">
            <div className="text-[10px] text-indigo-500 uppercase">Speedup</div>
            <div className="text-lg font-bold text-indigo-700">{idealSpeedup.toFixed(2)}x</div>
         </div>
      </div>
    </ToolCard>
  )
}

// Ch7. Cache Calc
const CacheCalc = () => {
  const [addrBits, setAddrBits] = useState(32);
  const [cacheSizeKB, setCacheSizeKB] = useState(16);
  const [blockSizeB, setBlockSizeB] = useState(64);
  const [ways, setWays] = useState(1); 

  const totalCacheBytes = cacheSizeKB * 1024;
  const numBlocks = totalCacheBytes / blockSizeB;
  const numSets = numBlocks / ways;
  
  const offsetBits = Math.log2(blockSizeB);
  const indexBits = Math.log2(numSets);
  const tagBits = addrBits - indexBits - offsetBits;

  return (
    <ToolCard title="Cache 映射分析" icon={Database} chapter="7">
        <div className="grid grid-cols-2 gap-3 mb-4">
           <InputField label="地址位" value={addrBits} onChange={setAddrBits} />
           <InputField label="容量(KB)" value={cacheSizeKB} onChange={setCacheSizeKB} />
           <InputField label="块大小(B)" value={blockSizeB} onChange={setBlockSizeB} />
           <InputField label="路数" value={ways} onChange={setWays} />
        </div>

        <div className="flex h-12 rounded-md overflow-hidden border border-slate-300 shadow-sm text-white text-center">
           <div style={{ flex: tagBits }} className="bg-orange-600 flex flex-col justify-center border-r border-orange-400 overflow-hidden">
             <span className="text-sm font-bold">{Math.max(0, tagBits)}</span>
             <span className="text-[9px] uppercase opacity-90">Tag</span>
           </div>
           <div style={{ flex: indexBits }} className="bg-purple-600 flex flex-col justify-center border-r border-purple-400 min-w-[30px]">
             <span className="text-sm font-bold">{Math.max(0, indexBits)}</span>
             <span className="text-[9px] uppercase opacity-90">Idx</span>
           </div>
           <div style={{ flex: offsetBits }} className="bg-sky-600 flex flex-col justify-center min-w-[30px]">
             <span className="text-sm font-bold">{Math.max(0, offsetBits)}</span>
             <span className="text-[9px] uppercase opacity-90">Off</span>
           </div>
        </div>
    </ToolCard>
  );
};

// Ch7. Cache Replacement Simulator
const CacheReplacementViz = () => {
    const [sequenceStr, setSequenceStr] = useState("1, 2, 3, 4, 1, 2, 5, 1, 2, 3, 4, 5");
    const [cacheSize, setCacheSize] = useState(3);
    const [step, setStep] = useState(0);

    const sequence = useMemo(() => {
        return sequenceStr.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));
    }, [sequenceStr]);

    const runSimulation = (algo: 'LRU' | 'FIFO') => {
        let cache = [];
        let history = [];
        let hits = 0;

        for (let i = 0; i <= step && i < sequence.length; i++) {
            const access = sequence[i];
            let hit = false;
            let victim = null;

            if (cache.includes(access)) {
                hit = true;
                if (algo === 'LRU') {
                    // Move to end (most recently used)
                    cache = cache.filter(c => c !== access);
                    cache.push(access);
                }
                // FIFO: Do nothing on hit
            } else {
                if (cache.length >= cacheSize) {
                    victim = cache.shift(); // Remove first (LRU: least recent, FIFO: first in)
                }
                cache.push(access);
            }
            if (i < sequence.length) {
                history.push({ access, hit, cache: [...cache], victim });
                if(hit) hits++;
            }
        }
        return { history, hits, total: Math.min(step + 1, sequence.length) };
    };

    const lruResult = runSimulation('LRU');
    const fifoResult = runSimulation('FIFO');
    const currentAccess = sequence[step];

    const renderCacheBlock = (block, isVictim, isHit) => (
        <div className={`
            w-8 h-8 flex items-center justify-center rounded border font-bold text-xs transition-all duration-300
            ${isVictim ? 'bg-rose-100 border-rose-300 text-rose-600 scale-90 opacity-50' : 'bg-white border-slate-300 text-slate-700'}
            ${block === currentAccess && isHit ? 'bg-emerald-100 border-emerald-400 text-emerald-700 ring-2 ring-emerald-200' : ''}
            ${block === currentAccess && !isHit ? 'bg-indigo-100 border-indigo-400 text-indigo-700 ring-2 ring-indigo-200' : ''}
        `}>
            {block}
        </div>
    );

    return (
        <ToolCard title="Cache 替换算法对比 (LRU vs FIFO)" icon={RefreshCw} chapter="7">
            <div className="mb-4 space-y-2">
                <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">访问序列 (逗号分隔)</label>
                    <input 
                        value={sequenceStr} onChange={e => { setSequenceStr(e.target.value); setStep(0); }}
                        className="w-full p-1.5 border border-slate-300 rounded font-mono text-xs"
                    />
                </div>
                <div className="flex gap-2 items-center">
                    <InputField label="Cache 容量" value={cacheSize} onChange={v=>{setCacheSize(v); setStep(0);}} />
                    <div className="flex-1 flex gap-1 items-end pb-0.5">
                        <button onClick={() => setStep(Math.max(0, step-1))} className="flex-1 py-1.5 bg-slate-200 text-slate-700 text-xs font-bold rounded">上一步</button>
                        <button onClick={() => setStep(Math.min(sequence.length-1, step+1))} className="flex-1 py-1.5 bg-indigo-600 text-white text-xs font-bold rounded">下一步</button>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 p-2 rounded border border-slate-200 text-center mb-4">
                <div className="text-xs text-slate-500 mb-1">当前访问</div>
                <div className="text-2xl font-bold text-slate-800">{currentAccess}</div>
                <div className="text-[10px] text-slate-400">Step {step + 1} / {sequence.length}</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* LRU Column */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-indigo-700">LRU</span>
                        <span className="text-[9px] bg-slate-200 px-1.5 rounded text-slate-600">Hit: {((lruResult.hits/(step+1))*100).toFixed(0)}%</span>
                    </div>
                    <div className="flex flex-col-reverse gap-1 border-l-2 border-slate-200 pl-2 min-h-[100px]">
                        {lruResult.history[step]?.cache.map((block, i) => (
                            <div key={i}>{renderCacheBlock(block, false, lruResult.history[step].hit)}</div>
                        ))}
                    </div>
                    {lruResult.history[step]?.victim && <div className="text-[9px] text-rose-500 mt-1">Victim: {lruResult.history[step].victim}</div>}
                </div>

                {/* FIFO Column */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-orange-700">FIFO</span>
                        <span className="text-[9px] bg-slate-200 px-1.5 rounded text-slate-600">Hit: {((fifoResult.hits/(step+1))*100).toFixed(0)}%</span>
                    </div>
                    <div className="flex flex-col-reverse gap-1 border-l-2 border-slate-200 pl-2 min-h-[100px]">
                        {fifoResult.history[step]?.cache.map((block, i) => (
                            <div key={i}>{renderCacheBlock(block, false, fifoResult.history[step].hit)}</div>
                        ))}
                    </div>
                    {fifoResult.history[step]?.victim && <div className="text-[9px] text-rose-500 mt-1">Victim: {fifoResult.history[step].victim}</div>}
                </div>
            </div>
        </ToolCard>
    )
};

// Ch7. Virtual Memory Viz
const VirtualMemoryViz = () => {
    const [vaHex, setVaHex] = useState("1A34");
    
    // Simulate 16-bit address space
    // Page Size = 4KB (12 bits offset) -> VPN = 4 bits (16 pages)
    const va = parseInt(vaHex, 16) || 0;
    const vpn = (va >> 12) & 0xF;
    const offset = va & 0xFFF;

    // Mock Page Table (Array of 16 entries)
    // [PPN, Valid]
    const pageTable = useMemo(() => [
        [0xA, 1], [0x2, 1], [0x0, 0], [0xB, 1], 
        [0xC, 1], [0x0, 0], [0xD, 1], [0xE, 1],
        [0xF, 1], [0x3, 1], [0x0, 0], [0x0, 0],
        [0x5, 1], [0x6, 1], [0x7, 1], [0x8, 1]
    ], []);

    const ptEntry = pageTable[vpn];
    const ppn = ptEntry[0];
    const valid = ptEntry[1];
    const pa = (ppn << 12) | offset;

    const toHex = (n, pad) => n.toString(16).toUpperCase().padStart(pad, '0');

    return (
        <ToolCard title="分页虚实地址转换 (VA → PA)" icon={FileDigit} chapter="7">
            <div className="mb-4">
                <label className="text-[10px] font-bold text-slate-500 uppercase">虚拟地址 (Hex, 16-bit)</label>
                <div className="flex items-center gap-2">
                    <span className="text-slate-400 font-mono text-sm">0x</span>
                    <input 
                        value={vaHex} 
                        onChange={e => {
                            if(e.target.value.length <= 4) setVaHex(e.target.value.toUpperCase());
                        }}
                        className="flex-1 p-1.5 border border-slate-300 rounded font-mono font-bold text-slate-700"
                    />
                </div>
            </div>

            {/* Address Breakdown */}
            <div className="flex gap-1 mb-4">
                <div className="flex-1 bg-indigo-50 border border-indigo-200 rounded p-1 text-center">
                    <div className="text-[9px] text-indigo-400 uppercase font-bold">VPN (4b)</div>
                    <div className="text-lg font-mono font-bold text-indigo-700">{toHex(vpn, 1)}</div>
                </div>
                <div className="flex-[3] bg-slate-50 border border-slate-200 rounded p-1 text-center">
                    <div className="text-[9px] text-slate-400 uppercase font-bold">Offset (12b)</div>
                    <div className="text-lg font-mono font-bold text-slate-600">{toHex(offset, 3)}</div>
                </div>
            </div>

            {/* Translation Flow */}
            <div className="relative pl-4 border-l-2 border-dashed border-slate-300 ml-4 space-y-4">
                {/* Page Table Lookup */}
                <div className="relative">
                    <div className="absolute -left-[21px] top-1.5 w-2.5 h-2.5 rounded-full bg-slate-400"></div>
                    <div className="text-xs font-bold text-slate-600 mb-1">查页表 (Page Table)</div>
                    <div className="bg-white border border-slate-200 rounded p-2 text-xs font-mono flex items-center gap-2">
                        <span>Index: <span className="font-bold text-indigo-600">{toHex(vpn, 1)}</span></span>
                        <ArrowRight className="w-3 h-3 text-slate-400" />
                        <span>PPN: <span className="font-bold text-emerald-600">{toHex(ppn, 1)}</span></span>
                        <span className={`px-1.5 rounded text-[9px] ${valid ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'}`}>
                            {valid ? 'Valid' : 'Page Fault'}
                        </span>
                    </div>
                </div>

                {/* Result */}
                <div className="relative">
                    <div className={`absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full border-2 ${valid ? 'bg-emerald-500 border-emerald-200' : 'bg-rose-500 border-rose-200'}`}></div>
                    <div className="text-xs font-bold text-slate-600 mb-1">物理地址 (PA)</div>
                    {valid ? (
                        <div className="flex items-center gap-1">
                            <div className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded font-mono font-bold">{toHex(ppn, 1)}</div>
                            <div className="bg-slate-100 text-slate-600 px-2 py-1 rounded font-mono font-bold">{toHex(offset, 3)}</div>
                            <div className="ml-auto font-mono text-lg font-bold text-slate-800">0x{toHex(pa, 4)}</div>
                        </div>
                    ) : (
                        <div className="bg-rose-50 border border-rose-200 text-rose-600 p-2 rounded text-xs font-bold text-center">
                            ⚠️ 缺页异常 (Page Fault)
                        </div>
                    )}
                </div>
            </div>
        </ToolCard>
    );
};

// Ch7. Hamming Code Viz
const HammingCodeViz = () => {
    const [data, setData] = useState("1011"); // 4 bits

    // Calculate Hamming (7,4)
    // D4 D3 D2 D1 -> P1 P2 D1 P4 D2 D3 D4
    // Pos: 1  2  3  4  5  6  7
    // Bit: P1 P2 D1 P4 D2 D3 D4
    
    // Parse data bits
    const dArray = data.padStart(4, '0').split('').map(Number);
    const D4 = dArray[0], D3 = dArray[1], D2 = dArray[2], D1 = dArray[3];

    // Calc Parity (Even Parity)
    // P1 checks 1, 3, 5, 7 -> P1, D1, D2, D4
    // P2 checks 2, 3, 6, 7 -> P2, D1, D3, D4
    // P4 checks 4, 5, 6, 7 -> P4, D2, D3, D4
    
    // P1 = D1 ^ D2 ^ D4
    const P1 = D1 ^ D2 ^ D4;
    // P2 = D1 ^ D3 ^ D4
    const P2 = D1 ^ D3 ^ D4;
    // P4 = D2 ^ D3 ^ D4
    const P4 = D2 ^ D3 ^ D4;

    const code = [P1, P2, D1, P4, D2, D3, D4];

    return (
        <ToolCard title="汉明码编码器 (7,4)" icon={ShieldAlert} chapter="7">
            <div className="mb-4">
                <label className="text-[10px] font-bold text-slate-500 uppercase">数据位 (4位)</label>
                <input 
                    value={data} onChange={e => {if(e.target.value.length<=4) setData(e.target.value)}}
                    className="w-full p-2 border border-slate-300 rounded font-mono text-sm tracking-widest text-center"
                    placeholder="1011"
                />
            </div>

            <div className="flex justify-between mb-2">
                {code.map((bit, i) => {
                    const pos = i + 1;
                    const isParity = [1, 2, 4].includes(pos);
                    return (
                        <div key={i} className="flex flex-col items-center">
                            <div className="text-[8px] text-slate-400 mb-1">{isParity ? `P${pos}` : `D`}</div>
                            <div className={`
                                w-8 h-8 flex items-center justify-center rounded font-mono font-bold
                                ${isParity ? 'bg-orange-100 text-orange-700 border border-orange-300' : 'bg-white border border-slate-300 text-slate-700'}
                            `}>
                                {bit}
                            </div>
                            <div className="text-[8px] text-slate-300 mt-1">{pos}</div>
                        </div>
                    )
                })}
            </div>

            <div className="bg-slate-50 p-2 rounded border border-slate-200 space-y-1 text-xs font-mono text-slate-600">
                <div className="flex items-center gap-2">
                    <span className="font-bold text-orange-600">P1</span> = D1⊕D2⊕D4 = {D1}^{D2}^{D4} = <span className="font-bold">{P1}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-orange-600">P2</span> = D1⊕D3⊕D4 = {D1}^{D3}^{D4} = <span className="font-bold">{P2}</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-orange-600">P4</span> = D2⊕D3⊕D4 = {D2}^{D3}^{D4} = <span className="font-bold">{P4}</span>
                </div>
            </div>
        </ToolCard>
    )
};

// Ch8. IO Interrupt Overhead
const IoOverheadCalc = () => {
  const [cpuFreq, setCpuFreq] = useState(500); // MHz
  const [rate, setRate] = useState(2); // MB/s
  const [unit, setUnit] = useState(2); // bytes per interrupt
  const [isr, setIsr] = useState(500); // cycles

  // interrupts per sec = (rate * 10^6) / unit
  const intPerSec = (rate * 1000000) / unit;
  // cycles used = intPerSec * isr
  const cyclesUsed = intPerSec * isr;
  // total cycles = cpuFreq * 10^6
  const totalCycles = cpuFreq * 1000000;
  
  const utilization = (cyclesUsed / totalCycles) * 100;
  const isOverloaded = utilization > 100;

  return (
    <ToolCard title="中断开销分析" icon={HardDrive} chapter="8">
      <div className="grid grid-cols-2 gap-3">
         <InputField label="CPU主频(MHz)" value={cpuFreq} onChange={setCpuFreq} />
         <InputField label="传输率(MB/s)" value={rate} onChange={setRate} step="0.1" />
      </div>
      <div className="grid grid-cols-2 gap-3">
         <InputField label="缓冲大小(B)" value={unit} onChange={setUnit} />
         <InputField label="ISR周期数" value={isr} onChange={setIsr} />
      </div>
      
      <div className={`mt-4 p-3 rounded-lg border text-center ${isOverloaded ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-emerald-50 border-emerald-200 text-emerald-800'}`}>
         <div className="text-xs uppercase font-bold mb-1">CPU 占用率</div>
         <div className="text-2xl font-bold font-mono">{utilization.toFixed(1)}%</div>
         <div className="text-xs mt-1">{isOverloaded ? "无法使用中断 (Use DMA)" : "可以使用中断"}</div>
      </div>
    </ToolCard>
  )
}

// Ch8. Interrupt Logic Visualizer
const InterruptLogicViz = () => {
    // 4 Sources. Priority 1 (low) to 4 (high).
    // Mask: true = masked (disabled).
    const [cpuPriority, setCpuPriority] = useState(0);
    const [masks, setMasks] = useState([false, false, false, false]); // For Int 1,2,3,4
    const [activeInt, setActiveInt] = useState<number | null>(null);
    const [resultMsg, setResultMsg] = useState("等待中断请求...");
    const [resultType, setResultType] = useState<"idle" | "accept" | "block">("idle");

    const toggleMask = (idx) => {
        const newMasks = [...masks];
        newMasks[idx] = !newMasks[idx];
        setMasks(newMasks);
    };

    const triggerInterrupt = (sourceIdx) => {
        const priority = sourceIdx + 1; // 1-based priority
        const isMasked = masks[sourceIdx];
        
        setActiveInt(sourceIdx);

        if (isMasked) {
            setResultType("block");
            setResultMsg(`中断被屏蔽 (IM=${masks.map(m=>m?'1':'0').join('')})`);
        } else if (priority <= cpuPriority) {
            setResultType("block");
            setResultMsg(`优先级不足 (Req:${priority} <= CPU:${cpuPriority})`);
        } else {
            setResultType("accept");
            setResultMsg(`中断响应！(Req:${priority} > CPU:${cpuPriority})`);
            // Optionally update CPU priority to simulate nesting
            // setCpuPriority(priority); 
        }
    };

    return (
        <ToolCard title="中断优先级与屏蔽演示" icon={ShieldAlert} chapter="8">
            <div className="flex justify-between items-center mb-4 bg-slate-100 p-2 rounded">
                 <div className="text-xs font-bold text-slate-500">当前 CPU 优先级 (PSW)</div>
                 <div className="flex items-center gap-2">
                     <button onClick={() => setCpuPriority(Math.max(0, cpuPriority-1))} className="w-6 h-6 rounded bg-white border flex items-center justify-center font-bold text-slate-600">-</button>
                     <span className="font-mono font-bold text-indigo-700 w-4 text-center">{cpuPriority}</span>
                     <button onClick={() => setCpuPriority(Math.min(4, cpuPriority+1))} className="w-6 h-6 rounded bg-white border flex items-center justify-center font-bold text-slate-600">+</button>
                 </div>
            </div>

            <div className="space-y-2 mb-4">
                {[0, 1, 2, 3].map((idx) => (
                    <div key={idx} className={`flex items-center justify-between p-2 rounded border transition-colors ${activeInt === idx ? (resultType==='accept' ? 'bg-emerald-50 border-emerald-300' : 'bg-rose-50 border-rose-300') : 'bg-white border-slate-200'}`}>
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                {idx + 1}
                            </div>
                            <div>
                                <div className="text-xs font-bold text-slate-700">IRQ {idx+1}</div>
                                <div className="text-[9px] text-slate-400">Priority {idx+1}</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                             {/* Mask Toggle */}
                             <div className="flex flex-col items-center">
                                 <span className="text-[8px] text-slate-400 uppercase mb-0.5">Mask</span>
                                 <button 
                                    onClick={() => toggleMask(idx)}
                                    className={`w-8 h-4 rounded-full relative transition-colors ${masks[idx] ? 'bg-rose-500' : 'bg-slate-300'}`}
                                 >
                                     <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${masks[idx] ? 'left-4' : 'left-0.5'}`}></div>
                                 </button>
                             </div>

                             <button 
                                onClick={() => triggerInterrupt(idx)}
                                className="px-2 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded hover:bg-indigo-100"
                             >
                                 Trigger
                             </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className={`p-3 rounded-lg border text-center transition-all ${
                resultType === 'idle' ? 'bg-slate-50 border-slate-200 text-slate-400' :
                resultType === 'accept' ? 'bg-emerald-100 border-emerald-300 text-emerald-800' :
                'bg-rose-100 border-rose-300 text-rose-800'
            }`}>
                <div className="text-sm font-bold">{resultMsg}</div>
                {resultType === 'accept' && <div className="text-[10px] mt-1 opacity-80">CPU 将保存现场并跳转 ISR</div>}
                {resultType === 'block' && <div className="text-[10px] mt-1 opacity-80">中断请求保持挂起 (Pending)</div>}
            </div>
        </ToolCard>
    );
};

// Ch8. DMA Transfer Mode Visualizer
const DmaTransferModeViz = () => {
    const [mode, setMode] = useState<'burst' | 'cycle'>('burst');

    // Visualize 10 cycles
    // Burst: CPU runs, then DMA takes over completely, then CPU resumes.
    // Cycle Stealing: CPU runs, DMA takes 1, CPU runs, DMA takes 1.
    
    return (
        <ToolCard title="DMA 传送模式时序图" icon={Network} chapter="8">
             <div className="flex gap-2 mb-4">
                <button 
                    onClick={() => setMode('burst')} 
                    className={`flex-1 py-1.5 text-xs font-bold rounded ${mode==='burst' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                    CPU 停止法 (Burst)
                </button>
                <button 
                    onClick={() => setMode('cycle')} 
                    className={`flex-1 py-1.5 text-xs font-bold rounded ${mode==='cycle' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}
                >
                    周期挪用法 (Stealing)
                </button>
             </div>

             <div className="relative pt-6 pb-2 overflow-hidden">
                 {/* Timeline Axis */}
                 <div className="absolute top-4 left-0 w-full h-px bg-slate-300"></div>
                 
                 <div className="flex gap-1">
                    {Array.from({length: 12}).map((_, i) => {
                        let owner = 'CPU';
                        let style = 'bg-slate-300 text-slate-600';

                        if (mode === 'burst') {
                            // Example: CPU 0-2, DMA 3-6, CPU 7-11
                            if (i >= 3 && i <= 6) {
                                owner = 'DMA';
                                style = 'bg-rose-500 text-white shadow-md scale-110 z-10';
                            } else {
                                style = 'bg-emerald-500 text-white'; // CPU active
                            }
                            if (i >= 3 && i <= 6 && owner === 'CPU') style = 'bg-slate-200 text-slate-400'; // CPU Halted (conceptually not owning)
                        } else {
                            // Cycle Stealing: DMA takes every 3rd cycle? Or interleaved.
                            // Let's say DMA needs to transfer 4 words.
                            // CPU CPU DMA CPU CPU DMA
                            const isDma = (i % 3 === 2) && i < 11; 
                            if (isDma) {
                                owner = 'DMA';
                                style = 'bg-rose-500 text-white shadow-md scale-110 z-10';
                            } else {
                                owner = 'CPU';
                                style = 'bg-emerald-500 text-white';
                            }
                        }

                        return (
                            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                                <div className="text-[9px] text-slate-400 font-mono">T{i}</div>
                                <div className={`w-full h-12 rounded flex items-center justify-center text-[10px] font-bold transition-all ${style}`}>
                                    {owner}
                                </div>
                            </div>
                        )
                    })}
                 </div>
             </div>

             <div className="mt-4 bg-slate-50 p-3 rounded border border-slate-200 text-xs text-slate-600 leading-relaxed">
                 {mode === 'burst' ? (
                     <p>
                         <strong className="text-indigo-700">CPU 停止法</strong>：DMA 获得总线控制权后，<span className="bg-rose-100 text-rose-700 px-1 rounded">独占</span>总线直到传输完整个数据块。期间 CPU 处于挂起状态 (Halt)，无法取指或访存。适合高传输率设备。
                     </p>
                 ) : (
                     <p>
                         <strong className="text-indigo-700">周期挪用法</strong>：DMA 仅在 CPU 不访存或强行<span className="bg-rose-100 text-rose-700 px-1 rounded">挪用一个周期</span>来传输一个字。CPU 和 DMA 交替工作，对 CPU 程序的执行影响较小。适合中速设备。
                     </p>
                 )}
             </div>
        </ToolCard>
    );
};

// Ch8. Bus Arbitration (Daisy Chain)
const BusArbitrationViz = () => {
    // 0 = Controller, 1 = Dev 1, 2 = Dev 2, 3 = Dev 3
    // Priority: Dev 1 > Dev 2 > Dev 3
    const [requests, setRequests] = useState([false, false, false]); // Dev 1, 2, 3
    
    // Calculate grant position. Grant propagates until it hits a requester.
    // 0 = Controller has BG. 
    // 1 = Dev 1 receives BG. If Req1, it keeps it. Else pass to Dev 2.
    
    let grantReceiver = 0; // Who is receiving the grant signal currently?
    let owner = null;

    if (requests[0]) {
        grantReceiver = 1; owner = 1;
    } else if (requests[1]) {
        grantReceiver = 2; owner = 2;
    } else if (requests[2]) {
        grantReceiver = 3; owner = 3;
    } else {
        // No requests
        grantReceiver = 3; // Signal propagates to end
        owner = null;
    }

    const toggleRequest = (idx) => {
        const newReq = [...requests];
        newReq[idx] = !newReq[idx];
        setRequests(newReq);
    };

    return (
        <ToolCard title="链式查询总线仲裁 (Daisy Chain)" icon={Share2} chapter="8">
            <div className="relative mb-6 pt-8">
                {/* Bus Lines Background */}
                <div className="absolute top-12 left-0 w-full h-1 bg-slate-300"></div> {/* Data/Addr */}
                <div className="absolute top-16 left-0 w-full h-1 bg-slate-200"></div> {/* BG Line Base */}
                
                {/* BG Line Active Segment */}
                <div className={`absolute top-16 left-0 h-1 bg-indigo-400 transition-all duration-300`} style={{ width: owner ? `${(owner * 25) + 12}%` : '100%' }}></div>

                <div className="flex justify-between relative z-10 px-2">
                    {/* Controller */}
                    <div className="flex flex-col items-center">
                        <div className="w-10 h-10 bg-slate-700 text-white rounded flex items-center justify-center text-[10px] font-bold z-10 shadow-lg">
                            Ctrl
                        </div>
                        <div className="h-8 w-0.5 bg-slate-400"></div>
                    </div>

                    {/* Devices */}
                    {[0, 1, 2].map((i) => {
                        const isReq = requests[i];
                        const isOwner = owner === (i + 1);
                        const devId = i + 1;
                        
                        // Logic: Device receives BG if all previous devs are NOT requesting
                        // Actually, simplified: if owner is me, I have BG. If owner > me, BG passed through me.
                        const hasBgIn = (owner === null) || (owner >= devId);
                        
                        return (
                            <div key={i} className="flex flex-col items-center gap-2 group relative">
                                {/* BG Logic Visualization */}
                                {hasBgIn && (
                                    <div className="absolute top-[42px] -left-6 w-6 h-0.5 bg-indigo-400">
                                        <ArrowRight className="w-3 h-3 text-indigo-500 absolute -right-2 -top-1.5" />
                                    </div>
                                )}

                                <button 
                                    onClick={() => toggleRequest(i)}
                                    className={`w-10 h-10 rounded border-2 flex flex-col items-center justify-center text-[9px] font-bold transition-all shadow-sm z-10
                                        ${isOwner ? 'bg-emerald-500 border-emerald-600 text-white scale-110 shadow-emerald-200 ring-2 ring-emerald-200' : 
                                          isReq ? 'bg-indigo-100 border-indigo-400 text-indigo-700' : 'bg-white border-slate-300 text-slate-500 hover:border-slate-400'}`}
                                >
                                    <div>Dev {devId}</div>
                                    {isReq && <div className="text-[8px] uppercase">{isOwner ? 'OWNER' : 'WAIT'}</div>}
                                </button>
                                
                                {/* Connection to bus */}
                                <div className="h-6 w-0.5 bg-slate-300 group-hover:bg-slate-400"></div>
                            </div>
                        )
                    })}
                    
                    {/* Terminator */}
                    <div className="flex flex-col items-center justify-end h-full pt-10">
                        <div className="text-[9px] text-slate-400">Term</div>
                    </div>
                </div>
            </div>

            <div className="text-xs text-slate-600 bg-slate-50 p-2 rounded border border-slate-200">
                <p>优先级顺序：<span className="font-bold">Dev 1 {'>'} Dev 2 {'>'} Dev 3</span> (物理位置决定)</p>
                <p className="mt-1 text-[10px] text-slate-500">
                    * 当 Dev 1 发出请求时，它会截断 BG 信号，下游设备（Dev 2, 3）即使发出请求也无法获得总线。
                </p>
            </div>
        </ToolCard>
    );
};

// Ch8. Disk Performance Calculator
const DiskPerformanceCalc = () => {
    const [rpm, setRpm] = useState(7200);
    const [seekTime, setSeekTime] = useState(5); // ms
    const [dataSize, setDataSize] = useState(4); // KB
    const [transferRate, setTransferRate] = useState(100); // MB/s

    // Calcs
    // Rotation Latency (Avg) = 0.5 * (60 / RPM) * 1000 ms
    const rotLatency = (0.5 * (60 / rpm) * 1000);
    
    // Transfer Time = (Size / Rate)
    // Size in KB, Rate in MB/s -> (Size / 1024) MB / Rate
    const transferTime = (dataSize / 1024) / transferRate * 1000;

    const totalTime = seekTime + rotLatency + transferTime;

    // Percentages for bar
    const pSeek = (seekTime / totalTime) * 100;
    const pRot = (rotLatency / totalTime) * 100;
    const pTrans = (transferTime / totalTime) * 100;

    return (
        <ToolCard title="磁盘存取时间计算器" icon={Disc} chapter="8">
            <div className="grid grid-cols-2 gap-3 mb-4">
                <InputField label="转速 (RPM)" value={rpm} onChange={setRpm} step="100" />
                <InputField label="平均寻道 (ms)" value={seekTime} onChange={setSeekTime} step="0.5" />
                <InputField label="数据量 (KB)" value={dataSize} onChange={setDataSize} />
                <InputField label="传输率 (MB/s)" value={transferRate} onChange={setTransferRate} />
            </div>

            <div className="space-y-2">
                <div className="flex h-8 rounded-md overflow-hidden text-[9px] font-bold text-white text-center leading-8 shadow-sm">
                    <div style={{width: `${pSeek}%`}} className="bg-slate-500" title="寻道时间">Seek</div>
                    <div style={{width: `${pRot}%`}} className="bg-indigo-500" title="旋转延迟">Rot</div>
                    <div style={{width: `${pTrans}%`}} className="bg-emerald-500" title="传输时间">Tx</div>
                </div>
                
                <div className="flex justify-between text-xs text-slate-600 px-1">
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-slate-500"></div>
                        <span>寻道: {seekTime.toFixed(2)}ms</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                        <span>旋转: {rotLatency.toFixed(2)}ms</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                        <span>传输: {transferTime.toFixed(2)}ms</span>
                    </div>
                </div>
            </div>

            <div className="mt-4 p-3 bg-slate-800 rounded-lg flex justify-between items-center text-white">
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-bold uppercase">Total Time</span>
                </div>
                <div className="text-xl font-mono font-bold text-emerald-400">
                    {totalTime.toFixed(2)} <span className="text-sm text-slate-400">ms</span>
                </div>
            </div>
        </ToolCard>
    );
};

// --- Main App ---

const App = () => {
    const [notes, setNotes] = useState(USER_DOCUMENT);
    const [isEditing, setIsEditing] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [docWidth, setDocWidth] = useState(896);
    const [activeChapterId, setActiveChapterId] = useState<string | null>(null);
  // Ref for the right sidebar to enable programmatic scrolling
  const rightSidebarRef = useRef<HTMLDivElement>(null);
  
  // Custom markdown components to inject IDs into H1s for navigation
  const markdownComponents = useMemo(() => ({
    h1: ({node, ...props}: any) => {
       const id = generateId(props.children);
       return <h1 id={id} {...props} />
    }
  }), []);

  // Intersection Observer for highlighting TOC and syncing right sidebar
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                if (id) {
                    setActiveChapterId(id);
                    
                    // Sync Right Sidebar
                    const chapterIndex = CHAPTERS.findIndex(c => c.id === id);
                    if (chapterIndex >= 0 && rightSidebarRef.current) {
                        const toolSection = document.getElementById(`tools-chapter-${chapterIndex + 1}`);
                        if (toolSection) {
                            toolSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }
                }
            }
        });
    }, { root: document.querySelector('main'), threshold: 0.1, rootMargin: "-10% 0px -80% 0px" });

    // Observe all H1 headers
    const headers = document.querySelectorAll('h1');
    headers.forEach(h => observer.observe(h));

    return () => observer.disconnect();
  }, [notes, isEditing]); // Re-run if content changes

  const scrollToChapter = (id: string) => {
      const el = document.getElementById(id);
      if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          setActiveChapterId(id);
      }
  };

  return (
    <div className="h-screen flex flex-col bg-slate-50 text-slate-900 font-sans overflow-hidden">
      {/* Header */}
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 shrink-0 z-20 shadow-sm relative">
        <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsNavOpen(!isNavOpen)}
              className="p-2 rounded-md hover:bg-slate-100 text-slate-500 transition-colors"
              title={isNavOpen ? "收起导航" : "展开导航"}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
                <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
                    <Cpu className="w-4 h-4" />
                </div>
                <span className="font-bold text-lg tracking-tight text-slate-800">计组复习</span>
            </div>
        </div>
        <div className="flex items-center gap-3">
             <div className="hidden lg:flex items-center gap-2 mr-2 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                <MoveHorizontal className="w-3.5 h-3.5 text-slate-400" />
                <input 
                  type="range" 
                  min="600" 
                  max="1400" 
                  step="40"
                  value={docWidth} 
                  onChange={(e) => setDocWidth(parseInt(e.target.value))}
                  className="w-20 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  title={`调整文档宽度: ${docWidth}px`}
                />
             </div>
             <button 
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-1.5"
            >
              {isEditing ? <Eye className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              {isEditing ? "预览" : "编辑"}
            </button>
            <div className="w-px h-4 bg-slate-300 mx-1"></div>
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-1.5 rounded-md transition-colors ${isSidebarOpen ? 'bg-indigo-50 text-indigo-600' : 'text-slate-500 hover:bg-slate-100'}`}
              title="切换侧边工具栏"
            >
              {isSidebarOpen ? <PanelRightClose className="w-5 h-5" /> : <PanelRightOpen className="w-5 h-5" />}
            </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar (Navigation) */}
        <aside 
          className={`bg-slate-50 flex-shrink-0 flex flex-col hidden md:flex transition-all duration-300 ease-in-out border-r border-slate-200 ${
            isNavOpen ? 'w-64 opacity-100' : 'w-0 opacity-0 border-none'
          }`}
        >
          <div className="p-4 border-b border-slate-200 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
            <div className="flex items-center gap-2 text-slate-500">
              <List className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">章节导航</span>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1 scrollbar-thin">
            {CHAPTERS.map((chapter) => (
              <button
                key={chapter.id}
                onClick={() => scrollToChapter(chapter.id)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200 border-l-2 ${
                  activeChapterId === chapter.id 
                  ? 'bg-white border-indigo-600 text-indigo-700 shadow-sm font-medium' 
                  : 'border-transparent text-slate-600 hover:bg-slate-200/50 hover:text-slate-900'
                }`}
              >
                <div className="truncate">{chapter.title}</div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main Document Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 scrollbar-thin scroll-smooth relative">
           <div 
             style={{ maxWidth: `${docWidth}px` }}
             className="mx-auto p-8 min-h-full bg-white shadow-sm border-x border-slate-100/50 transition-[max-width] duration-300 ease-in-out"
           >
             {isEditing ? (
                <textarea
                  className="w-full h-full min-h-[80vh] resize-none outline-none font-mono text-sm text-slate-700 leading-relaxed"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="在此输入 Markdown..."
                />
             ) : (
                <article className="prose prose-slate prose-lg max-w-none 
                  prose-headings:font-bold prose-headings:text-slate-900 prose-headings:scroll-mt-20
                  prose-h1:text-3xl prose-h1:mb-8 prose-h1:pb-4 prose-h1:border-b prose-h1:border-slate-100
                  prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-indigo-700
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-slate-800
                  prose-p:text-slate-600 prose-p:leading-7
                  prose-strong:text-indigo-900 prose-strong:font-bold
                  [&_:not(pre)>code]:text-indigo-600 [&_:not(pre)>code]:bg-indigo-50 [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-0.5 [&_:not(pre)>code]:rounded-md [&_:not(pre)>code]:before:content-none [&_:not(pre)>code]:after:content-none
                  prose-pre:bg-slate-900 prose-pre:text-slate-50 prose-pre:rounded-xl prose-pre:shadow-lg
                  prose-table:text-sm
                  prose-th:bg-slate-50 prose-th:text-slate-700
                  prose-td:text-slate-600
                ">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm, remarkMath]} 
                    rehypePlugins={[rehypeKatex]}
                    components={markdownComponents as any}
                  >
                    {notes}
                  </ReactMarkdown>
                </article>
             )}
             <div className="h-32"></div>
           </div>
        </main>

        {/* Right Sidebar Tools */}
        <aside 
            ref={rightSidebarRef}
            className={`
                bg-slate-50 border-l border-slate-200 overflow-y-auto transition-all duration-300 ease-in-out scrollbar-thin
                ${isSidebarOpen ? 'w-[420px] translate-x-0' : 'w-0 translate-x-full opacity-0'}
            `}
        >
            <div className="p-6 w-[420px]">
                <div className="flex items-center justify-between mb-6">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1">
                        可视化工具箱
                    </div>
                    <span className="text-[10px] bg-indigo-100 text-indigo-600 px-2 py-0.5 rounded-full font-bold">Live Sync</span>
                </div>
                
                {/* Tools grouped by chapter for scrolling targets */}
                <div id="tools-chapter-1" className="space-y-6 scroll-mt-6">
                    <div className="text-xs font-bold text-slate-300 uppercase pl-1 mb-2 border-b border-slate-200 pb-1">Ch1. 系统概述</div>
                    <AbstractionLayersViz />
                    <CompilationProcessViz />
                    <AmdahlCalc />
                    <CpuTimeCalc />
                </div>

                <div id="tools-chapter-2" className="space-y-6 mt-12 scroll-mt-6">
                    <div className="text-xs font-bold text-slate-300 uppercase pl-1 mb-2 border-b border-slate-200 pb-1">Ch2. 数据表示</div>
                    <BaseConverter />
                    <EndiannessViz />
                    <Ieee754Calc />
                    <ComplementCalc />
                </div>

                <div id="tools-chapter-3" className="space-y-6 mt-12 scroll-mt-6">
                    <div className="text-xs font-bold text-slate-300 uppercase pl-1 mb-2 border-b border-slate-200 pb-1">Ch3. 运算方法</div>
                    <AluSimulator />
                    <BitShifter />
                </div>

                <div id="tools-chapter-4" className="space-y-6 mt-12 scroll-mt-6">
                    <div className="text-xs font-bold text-slate-300 uppercase pl-1 mb-2 border-b border-slate-200 pb-1">Ch4. 指令系统</div>
                    <MipsVisualizer />
                    <AddressingModeViz />
                    <StackFrameViz />
                </div>

                <div id="tools-chapter-5" className="space-y-6 mt-12 scroll-mt-6">
                     <div className="text-xs font-bold text-slate-300 uppercase pl-1 mb-2 border-b border-slate-200 pb-1">Ch5. 处理器</div>
                    <DatapathViz />
                    <FsmWalker />
                    <ExceptionDemo />
                    <ControlSignalViewer />
                </div>

                <div id="tools-chapter-6" className="space-y-6 mt-12 scroll-mt-6">
                    <div className="text-xs font-bold text-slate-300 uppercase pl-1 mb-2 border-b border-slate-200 pb-1">Ch6. 流水线</div>
                    <PipelineSpaceTimeViz />
                    <ForwardingUnitViz />
                    <PipelineCalc />
                </div>

                <div id="tools-chapter-7" className="space-y-6 mt-12 scroll-mt-6">
                    <div className="text-xs font-bold text-slate-300 uppercase pl-1 mb-2 border-b border-slate-200 pb-1">Ch7. 存储器</div>
                    <CacheReplacementViz />
                    <VirtualMemoryViz />
                    <CacheCalc />
                    <HammingCodeViz />
                </div>

                <div id="tools-chapter-8" className="space-y-6 mt-12 scroll-mt-6">
                    <div className="text-xs font-bold text-slate-300 uppercase pl-1 mb-2 border-b border-slate-200 pb-1">Ch8. IO系统</div>
                    <IoOverheadCalc />
                    <InterruptLogicViz />
                    <DmaTransferModeViz />
                    <BusArbitrationViz />
                    <DiskPerformanceCalc />
                </div>

                <div className="text-center text-xs text-slate-400 mt-12 mb-4 pb-12">
                    CO.Review Lab v1.3
                </div>
            </div>
        </aside>

      </div>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<App />);