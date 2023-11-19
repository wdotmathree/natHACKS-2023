; Print the contents of a file called flag.txt in the current directory
section .data
times 0x1000 - (48 + 8) db 0xf4
buf: times 48 db 0xf4
target: dq 0
section .text
global _start
_start:
	xor eax, eax
	xor edi, edi
	lea rsi, [rel buf-5]
	mov edx, 56
	syscall
	mov eax, 559038737
	not eax
	movsx rax, eax
	sub eax, 0xffffffff
	mov edx, 554856191
	or edx, -2147483648
	movsx rdx, edx
	mov ecx, -2147483648
	xor rdx, rcx
	not rdx
	sub rdx, 0xffffffff
	xor rax, rdx
	vpcmpeqq ymm0, ymm0, ymm0
	vorps ymm0, ymm0, ymm0
	vpandn ymm0, ymm0, ymm0
	vmovq rcx, xmm0
	call [rax+rcx*8+10]
	mov eax, 60
	xor edi, edi
	syscall
