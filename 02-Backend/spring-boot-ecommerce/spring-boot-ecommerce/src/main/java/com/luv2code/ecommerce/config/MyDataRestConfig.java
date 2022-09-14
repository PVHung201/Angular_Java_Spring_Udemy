package com.luv2code.ecommerce.config;

import com.luv2code.ecommerce.entity.*;
//import org.hibernate.type.EntityType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    @Value("${allowed.origins}")
    private String[] theAllowedOrigins;

    private EntityManager entityManager;
    @Autowired
    public MyDataRestConfig(EntityManager theEntityManager){
        entityManager = theEntityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {
        RepositoryRestConfigurer.super.configureRepositoryRestConfiguration(config, cors);
        HttpMethod[] theUnsupporteActions = {HttpMethod.PUT, HttpMethod.POST,
                                            HttpMethod.DELETE, HttpMethod.PATCH};



        //Disable HTTP methods for ProductCategory: PUT POST and DELETE

        disableHttpMethods(Product.class, config, theUnsupporteActions);
        disableHttpMethods(ProductCategory.class, config, theUnsupporteActions);
        disableHttpMethods(Country.class, config, theUnsupporteActions);
        disableHttpMethods(State.class, config, theUnsupporteActions);
        disableHttpMethods(Order.class, config, theUnsupporteActions);


        //call an titernal helper method
        exposeIds(config);

        //configure cors mapping
        cors.addMapping(config.getBasePath() + "/**").allowedOrigins(theAllowedOrigins);
    }

    private void disableHttpMethods(Class theClass, RepositoryRestConfiguration config, HttpMethod[] theUnsupporteActions) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupporteActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupporteActions));
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        // expose entity ids

        // get a list of all entity classes from the entity manager

        // chú ý đã thay đổi code
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
        // create an array of the entity types
        List<Class> entityClasses = new ArrayList<>();

        //get the entity types for the entities
        for (EntityType tempEntityType: entities){
            entityClasses.add(tempEntityType.getJavaType());
        }

        // expose the entity ids for the array of entity
        Class[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }
}
