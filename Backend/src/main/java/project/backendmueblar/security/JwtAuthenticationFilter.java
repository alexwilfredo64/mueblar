package project.backendmueblar.security;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import project.backendmueblar.modules.auth.services.AuthService;
import project.backendmueblar.modules.auth.services.JwtService;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final AuthService authService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain )
            throws ServletException, IOException {
        final String authHeader = request.getHeader("Authorization");

        String urlRequested =  request.getRequestURI();
        String httpMethod = request.getMethod().toUpperCase();

        String userEmail = jwtService.extractEmail(authHeader);

        Map<String, Integer> endpointPermissionMap = authService.extractEndpointAndPermission(authHeader, urlRequested);

        if(userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            if (!urlHasEnoughPermissions(endpointPermissionMap, urlRequested, httpMethod)) {
                response.sendError(HttpServletResponse.SC_FORBIDDEN, "Acceso denegado: No tienes los permisos necesarios para esta acción.");
                return;
            }
            if (jwtService.validateJWTIntegrity(authHeader)) {
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userEmail, null);
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request, response);

        private boolean urlHasEnoughPermissions(Map<String, Integer> endpointPermissionMap, String url, String httpMethod) {
            Integer permissionsInBits = endpointPermissionMap.get(url);
            int requiredBit = switch (httpMethod) {
                case "GET" -> 1;    // ACCESO
                case "POST" -> 2;   // CREACION
                case "PUT" -> 4;    // MODIFICACION
                case "DELETE" -> 8; // ELIMINACION
                default -> 0;       // Cualquier otro método no lo permitimos por defecto
            };
            return (permissionsInBits & requiredBit) == requiredBit;
        }
    }
}