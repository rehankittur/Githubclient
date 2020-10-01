FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
EXPOSE 80
EXPOSE 443
# copy csproj and restore as distinct layers

COPY *.csproj ./employeeservice/

RUN dotnet restore ./employeeservice/EmployeeAppPWA.csproj

# copy everything else and build app
COPY . ./employeeservice/
WORKDIR /src/employeeservice
RUN dotnet publish -c Release -o out


FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS runtime
WORKDIR /src
COPY --from=build /src/employeeservice/out ./
ENTRYPOINT ["dotnet", "EmployeeAppPWA.dll"]